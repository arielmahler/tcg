import Player from "./lib/Player";
import Game from "./model/Game";
import Diluc from "./model/characters/Diluc";
import { Card, Character } from "./types/tcgTypes";

const p1Deck:Card[] = []
const p2Deck:Card[] = []

const player1: Player = new Player(p1Deck, 'player1');
const player2: Player = new Player(p2Deck, 'player2');

const p1Characters:Character[] = [new Diluc(), new Diluc(), new Diluc()]
const p2Characters:Character[] = [new Diluc(), new Diluc(), new Diluc()]


function Main(): void {
    const game: Game = new Game();

    p1Characters.forEach(item => {
        player1.addCharacter(item);
    })
    p2Characters.forEach(item => {
        player2.addCharacter(item);
    })

    game.join(player1);
    game.join(player2);

    game.ready(player1);
    game.ready(player2);
}