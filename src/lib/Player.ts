import { Card, Character, Elements } from '../types/tcgTypes';
import { Stack } from '../types/Stack'
import OverflowError, { STACK_EMPTY } from '../types/OverflowError';
import InvalidParametersError, { CHARACTER_LIST_FULL_MESSAGE, INVALID_COMMAND_MESSAGE, PLAYER_ALREADY_HAS_CHARACTER_MESSAGE } from '../types/InvalidParametersError';

const STARTING_DICE:number = 10;
const NUMBER_OF_ELEMENTS = 8;

export default class Player {
    private _deck:Stack<Card>;
    private _hand:Card[];
    private _characters:Character[];
    private _inPlayChar:number;
    private readonly _playerID:string;
    private readonly _userName: string;
    public dice:Elements[];
    
    constructor(deck: Card[], ID:string) {
        this._deck = new Stack<Card>(30, deck);
        for (let i = 0; i < 5; i++) {
            let card = this._deck.pop();
            if (card === undefined) {
                throw new OverflowError(STACK_EMPTY);
            }
            this._hand.push(card);
        }
        this._characters = [];
        this._inPlayChar = 0;
        this._playerID = ID;
        this._rollDice();
    }

    /**
     * Rolls dice for player
     */
    private _rollDice(): void {
        for (let i = 0; i < STARTING_DICE; i++) {
            this.dice[i] = this._convertNumToElement(Math.floor(
                Math.random() * (NUMBER_OF_ELEMENTS + 1)));
        }
    }

    /**
     * Attempts to convert a given number to an Element.
     * @param num Some number
     * @returns The element mapped to the given number in the function
     * @throws InvalidParametersError(INVALID_COMMAND_MESSAGE) if the number is < 0 or > 7
     */
    private _convertNumToElement(num: number): Elements {
        switch (num) {
            case 0: return 'Hydro';
            case 1: return 'Electro';
            case 2: return 'Anemo';
            case 3: return 'Geo';
            case 4: return 'Pyro';
            case 5: return 'Dendro';
            case 6: return 'Cryo';
            case 7: return 'Omni';
            default: throw new InvalidParametersError(INVALID_COMMAND_MESSAGE);
        }
    }

    /**
     * Returns the player's ID.
     */
    public get pID(): string {
        return this._playerID;
    }

    /**
     * Returns the in-play character this player has.
     * TODO: will throw error if no characters!
     */
    public get charInPlay(): Character {
        return this._characters[this._inPlayChar];
    }

    /**
     * Adds a character to the player's character list, if possible.
     * @param character The character to add
     * @throws InvalidParametersError if the character cannot be added to the player.
     */
    public addCharacter(character: Character): void {
        if (this._characters.length >= 3) {
            throw new InvalidParametersError(CHARACTER_LIST_FULL_MESSAGE);
        }
        if (this._characters.find(item => item.name === character.name)) {
            throw new InvalidParametersError(PLAYER_ALREADY_HAS_CHARACTER_MESSAGE);
        }
        character.owner = this.pID;
        this._characters.push(character);
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
                let card = this._deck.pop();
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
        if (this._characters[newChar].health <= 0) {
            throw new RangeError("Character is dead.");
        }
    }
}