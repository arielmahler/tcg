import { PlayerModel } from '../newModel/PlayerModel'
import { CharacterImpl } from '../newModel/characters/CharacterImpl';


export type Elements =
    | 'Hydro'
    | 'Electro'
    | 'Anemo'
    | 'Geo'
    | 'Pyro'
    | 'Dendro'
    | 'Cryo'
    | 'Omni';

export type Type = 
    | 'Equipment'
    | 'Support'
    | 'Event';

/**
 * interface for creating a stack datatype.
 */
export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

/**
 * This interface represents a character and the operations to monitor
 * it, but not use it.
 */
export interface Character {
    /**
     * Returns the character's name.
     */
    get name(): String;

    /**
     * Returns the owner of this character.
     */
    get owner(): number;
}

/**
 * This interface outlines the basic functions and enums that a non-character card should have.
 */
interface CardModelState {
    /**
     * Returns the card's name.
     */
    get name(): String;

    /**
     * Returns the card's description.
     */
    get description():String;

    /**
     * Returns the Element type of the card.
     */
    get elementType():Elements;

    /**
     * Returns the card type.
     */
    get cardType():Type;

    /**
     * This method applies the card's effect from the given player to the given target.
     * @param player The player the card will effect.
     * @param target The targeted character.
     * @throws InvalidParametersError If the effect cannot trigger.
     */
    use: (player:PlayerModel, target:CharacterImpl) => void;
}