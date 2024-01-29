import Player from "../src/lib/Player";
import Game from "../src/model/Game";
import { nanoid } from 'nanoid';
import { GAME_FULL_MESSAGE, GAME_NOT_STARTABLE_MESSAGE, PLAYER_ALREADY_IN_GAME_MESSAGE, PLAYER_NOT_IN_GAME_MESSAGE } from "../src/types/InvalidParametersError";


function createPlayerForTesting(): Player {
    return new Player([], `username${nanoid()}`);
}

describe('Game', () => {
    let game: Game;
    beforeEach(() => {
      game = new Game();
    });
    describe('join', () => {
      it('should throw an error if the player is already in the game', () => {
        const player = createPlayerForTesting();
        game.join(player);
        expect(() => game.join(player)).toThrow(PLAYER_ALREADY_IN_GAME_MESSAGE);
      });
      it('should throw an error if there are already two players in the game', () => {
        const player1 = createPlayerForTesting();
        const player2 = createPlayerForTesting();
        const player3 = createPlayerForTesting();
        game.join(player1);
        game.join(player2);
        expect(() => game.join(player3)).toThrow(GAME_FULL_MESSAGE)
      });
      it('should change the state status to WAITING_TO_START if there are two players', () => {
        const player1 = createPlayerForTesting();
        const player2 = createPlayerForTesting();
        expect(game.state.status).toEqual('WAITING_FOR_PLAYERS');
        game.join(player1);
        game.join(player2);
        expect(game.state.status).toEqual('WAITING_TO_START');
      });
      it('should add the first player to the player1 slot', () => {
        const player1 = createPlayerForTesting();
        expect(game.state.player1).toBeUndefined();
        game.join(player1);
        expect(game.state.player1).toEqual(player1.pID);
      });
    });
    describe('ready', () => {
        let player1: Player;
        let player2: Player;
        beforeEach(() => {
            game = new Game();
            player1 = createPlayerForTesting();
            player2 = createPlayerForTesting();
            game.join(player1);
            game.join(player2);
        });
        it('should throw an error if the calling player is not in the game', () => {
            const player3 = createPlayerForTesting();
            expect(() => game.ready(player3)).toThrow(PLAYER_NOT_IN_GAME_MESSAGE);
        });
        it('should throw an error if the game is not waiting to start', () => {
            const newGame = new Game();
            newGame.join(player1);
            expect(() => newGame.ready(player1)).toThrow(GAME_NOT_STARTABLE_MESSAGE);
        })
    });
    describe('applyAttack', () => {
        beforeEach(() => {
            game = new Game();
            const player1 = createPlayerForTesting();
            const player2 = createPlayerForTesting();
            game.join(player1);
            game.join(player2);
            game.ready(player1);
            game.ready(player2);
          });
        it('should throw an error if the calling player is not in the game', () => {
            const player3 = createPlayerForTesting();
            
        });
    });
});