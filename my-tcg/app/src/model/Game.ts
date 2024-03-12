import InvalidParametersError, { GAME_FULL_MESSAGE, GAME_NOT_IN_PROGRESS_MESSAGE, GAME_NOT_STARTABLE_MESSAGE, INVALID_COMMAND_MESSAGE, MOVE_NOT_YOUR_TURN_MESSAGE, PLAYER_ALREADY_IN_GAME_MESSAGE, PLAYER_NOT_IN_GAME_MESSAGE } from "../types/InvalidParametersError";
import { AttackMove, Elements, GameState } from "../types/tcgTypes";
import Player from '../lib/Player'
import assert from 'assert';

/**
 * This class represents the model and, by proxy, arbiter of the game.
 */
export default class Game {

    /** The set of two players in the game */
    protected _players: Player[] = []
    private _state: GameState;

    constructor(initialState:GameState = {status: 'WAITING_FOR_PLAYERS', moves: 0}) {
        this._state = initialState;
    }

    public get state(): GameState {
        return this._state;
    }
 
    /**
     * Declares that the given player is ready
     * @param player The player that is ready
     * @throws InvalidParametersError(PLAYER_NOT_IN_GAME_MESSAGE) if player is not in game
     * @throws InvalidParametersError(GAME_NOT_STARTABLE_MESSAGE) if game is not startable
     */
    public ready(player: Player) {
        if (!this._players.includes(player)) {
            throw new InvalidParametersError(PLAYER_NOT_IN_GAME_MESSAGE);
        }
        if (this._state.status !== 'WAITING_TO_START') {
            throw new InvalidParametersError(GAME_NOT_STARTABLE_MESSAGE);
        }
        if (this._state.player1 === player.pID) {
            this._state.player1Ready = true;
            } else {
            this._state.player2Ready = true;
            }
        
            if (this._state.player1Ready && this._state.player2Ready) {
            this._state.status = 'IN_PROGRESS';
            }
    }

    /**
     * Attempt to join a game.
     * @param player The player joining the game.
     * @throws InvalidParametersError if the player can not join the game
     */
    public join(player: Player): void {
        if (this._players.length >= 2) {
            throw new InvalidParametersError(GAME_FULL_MESSAGE);
        }
        if (this._players.includes(player)) {
            throw new InvalidParametersError(PLAYER_ALREADY_IN_GAME_MESSAGE);
        }
        if (this._state.player1 === undefined) {
            this._state.player1 = player.pID;
            this._state.player1Ready = false;
        } else {
            this._state.player2 = player.pID;
            this._state.player2Ready = false;
        }
        this._players.push(player);
        if (this._players.length === 2) {
            this._state.status = 'WAITING_TO_START';
        }
    }

    /**
     * Attempt to leave a game.
     * @param player The player leaving the game.
     * @throws InvalidParametersError if the player can not leave the game
     */
    public leave(player: Player): void {
        if (!this._players.includes(player)) {
            throw new InvalidParametersError(PLAYER_NOT_IN_GAME_MESSAGE);
        }
        switch (this._state.status) {
            case 'IN_PROGRESS':
              // End game, opponent is the winner
              this._state.status = 'OVER';
              this._state.winner = this._state.player1 === player.pID ? this._state.player1 : this._state.player2;
              break;
            case 'WAITING_TO_START':
              this._state.status = 'WAITING_FOR_PLAYERS';
              break;
            case 'OVER':
              // We do not want to change the state of the game in any way, leave the function.
              return;
            default:
              // Currently, the only remaining states are WAITING_FOR_PLAYERS and OVER
              break;
          }
          if (this._state.player1 === player.pID) {
            this._state.player1 = undefined;
            this._state.player1Ready = false;
          } else {
            this._state.player2 = undefined;
            this._state.player2Ready = false;
          }   
        this._players = this._players.filter(p => p.pID !== player.pID);
    }

    /**
     * Returns true if the given dice exactly cover the cost
     * @param diceIn The dice that are given
     * @param diceCost The dice that are needed
     * @param align If the die must all be of the same alignment
     */
    private _checkDice(diceIn: Elements[], diceCost: Elements[], align: boolean): boolean {
        if (diceIn.length !== diceCost.length) { return false; }
        if (align) {
            // dice must all be the same element, or have Omni's
            const d1 = diceIn.find(val => val !== 'Omni');
            if (!d1) { return true; }
            return diceIn.every(val => val === d1 || val === 'Omni');
        }
        
        let elementDice = diceCost.filter(val => val !== 'Omni');
        let result = true;
        for (const element of elementDice) {
            let die = diceIn.indexOf(element);
            if (die === -1) {
                // There are no die that fit, try to remove an Omni
                die = diceIn.indexOf('Omni');
                if (die === -1) { return false; }
                diceIn.splice(die, 1);
            } else {
                // There is a die, remove it
                diceIn.splice(die, 1);
            }
        }
        return result;
    }

    /**
     * Attempts to execute the given attack from the calling player
     * @param attack The attack move
     * @param dice The given dice from the player
     * @param player The calling player
     */
    public applyAttack(attack: AttackMove, dice: Elements[], player: Player) {
        if (player.pID !== this._state.player1 && player.pID !== this._state.player2) {
            throw new InvalidParametersError(PLAYER_NOT_IN_GAME_MESSAGE);
        }
        if (this._state.status !== 'IN_PROGRESS') {
            throw new InvalidParametersError(GAME_NOT_IN_PROGRESS_MESSAGE);
        }
        if (
            (player.pID === this._state.player1 && this.state.moves % 2 === 1) ||
            (player.pID === this._state.player2 && this.state.moves % 2 === 0)
          ) {
            throw new InvalidParametersError(MOVE_NOT_YOUR_TURN_MESSAGE);
          }
          let otherPlayer = this._players.find(p => p.pID !== player.pID);
          assert(otherPlayer !== undefined, 'Other player is undefined');
          let character = player.charInPlay;
        switch(attack.attackType) {
            case 'Normal': {
                if (this._checkDice(dice, character.normalAttackCost, false)) {
                    character.useNormalAttack(otherPlayer.charInPlay);
                }
                break;
            }
            case 'Skill': {
                if (this._checkDice(dice, character.skillCost, false)) {
                    character.useSkill(otherPlayer.charInPlay);
                }
                break;
            }
            case 'Burst': {
                if (this._checkDice(dice, character.burstCost, false)) {
                    character.useBurst(otherPlayer.charInPlay);
                }
                break;
            }
            default: {
                throw new InvalidParametersError(INVALID_COMMAND_MESSAGE);
            }
        }
        this._state.moves += 1;
    }
}