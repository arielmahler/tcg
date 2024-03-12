import Player from "../lib/Player";
import Game from "../model/Game";
import InvalidParametersError, { GAME_NOT_IN_PROGRESS_MESSAGE, INVALID_COMMAND_MESSAGE } from "../types/InvalidParametersError";
import { InteractableCommand } from "../types/tcgTypes";


export default class GameController {
    private _game?: Game;

    public get game(): Game | undefined {
        return this._game;
    }

    /**
     * Attempts to process a given command for the given player
     * @param command The command to be processed in the game
     * @param player The player calling the command
     * @throws InvalidParametersError if the command is not supported or invalid.
     */
    public handleCommand(command: InteractableCommand, player: Player): void {
        let game = this._game;

        switch(command.type) {
            case 'JoinGame': {
                if (!game || game.state.status === 'OVER') {
                    game = new Game();
                    this._game = game;
                }
                game.join(player);
                break;
            }
            case 'LeaveGame': {
                if (!game) {
                    throw new InvalidParametersError(GAME_NOT_IN_PROGRESS_MESSAGE);
                }
                game.leave(player);
                break;
            }
            case 'StartGame': {
                if (!game) {
                    throw new InvalidParametersError(GAME_NOT_IN_PROGRESS_MESSAGE);
                }
                game.ready(player);
                break;
            }
            case 'GameMove': {
                if (!game) {
                    throw new InvalidParametersError(GAME_NOT_IN_PROGRESS_MESSAGE);
                }
                switch(command.move.type) {
                    case 'Attack':
                        game.applyAttack(command.move, command.dice, player);
                        break;
                    case 'Swap':
                    case 'ConvertCard':
                    case 'PlayCard':
                    default: throw new InvalidParametersError(INVALID_COMMAND_MESSAGE);
                }
                break;
            }
            default: throw new InvalidParametersError(INVALID_COMMAND_MESSAGE);
        }
    }
}