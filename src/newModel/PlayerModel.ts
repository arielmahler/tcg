import { CardModelState } from '../types/tcgTypes';
import { Stack } from '../types/Stack'
import OverflowError, { STACK_EMPTY } from '../types/OverflowError';
import { CharacterImpl } from './characters/CharacterImpl';

export class PlayerModel {
    private _deck:Stack<CardModelState>;
    private _hand:CardModelState[];
    private _CHARACTERS:CharacterImpl[];
    private _playerID:number;
    private _inPlayChar:number;
    
    constructor(deck: CardModelState[], c1:CharacterImpl, c2:CharacterImpl, c3:CharacterImpl, ID:number) {
        this._deck = new Stack<CardModelState>(30, deck);
        for (let i = 0; i < 5; i++) {
            var card = this._deck.pop();
            if (card === undefined) {
                throw new OverflowError(STACK_EMPTY);
            }
            this._hand.push(card);
        }
        this._CHARACTERS = [c1, c2, c3];
        this._inPlayChar = 0;
        this._playerID = ID;
    }

    /**
     * Returns the player's ID.
     */
    public get pID(): number {
        return this._playerID;
    }

    /**
     * Returns the in-play character this player has.
     */
    public get charInPlay(): CharacterImpl {
        return this._CHARACTERS[this._inPlayChar];
    }

    /**
     * Draw the given number of cards from the deck, if possible.
     * @param numOfCards the number of cards to draw.
     */
    public draw(numOfCards:number): void {
        let space = 10 - this._hand.length;
        let cardsDrawn = 0;

        numOfCards = (numOfCards > space) ? numOfCards : space;

        for (let i = 0; i < numOfCards; i++) {
            try {
                var card = this._deck.pop();
                if (card === undefined) {
                    throw new OverflowError(STACK_EMPTY);
                }
                this._hand.push(card);
                cardsDrawn++;
            } catch (OverflowError) {
                // Leave early, we ran out of cards
                break;
            }
        }
    }

    /**
     * Changes the active character to the one at the given index, provided they are alive.
     * @param newChar The index of the new character.
     * @throws RangeError If the character is dead or the given index is out of bounds.
     */
    public changeCharacter(newChar:number): void {
        if (newChar < 0 || newChar > 2) {
            throw new RangeError('Choice out of range');
        }
        if (this._CHARACTERS[newChar].health <= 0) {
            throw new RangeError("Character is dead.");
        }
    }
}