import PlayerInstance from '../lib/Player'
import AbstractCharacter  from '../model/characters/AbstractCharacter';


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

export type CharacterHealth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type WeaponType = 'Sword' | 'Claymore' | 'Catalyst' | 'Polearm' | 'Bow';

/**
 * This interface represents a character and the operations to monitor
 * it, but not use it.
 */
export interface Character {
    health: CharacterHealth;
    ate: boolean;
    normalAttackCost: Elements[];
    skillCost: Elements[];
    burstCost: Elements[];

    get name(): string;
    get owner(): PlayerID;

    /**
     * Sets the owner of the character. Should only be doable once.
     */
    set owner(player: PlayerID);

    /**
     * Normal attack
     */
    useNormalAttack(target?: Character): void;

    /**
     * Skill
     */
    useSkill(target?: Character): void;

    /**
     * Burst
     */
    useBurst(target?: Character): void;

    takeDamage(value: number): void;
}

export type GameStatus = 'IN_PROGRESS' | 'WAITING_TO_START' | 'OVER' | 'WAITING_FOR_PLAYERS'
export type GameID = string;

export type InteractableCommand = 
    | JoinGameCommand
    | LeaveGameCommand
    | GameMoveCommand<AttackMove>
    | GameMoveCommand<SwapMove>
    | GameMoveCommand<CovertCardMove>
    | GameMoveCommand<PlayCardMove>
    | StartGameCommand;

export interface JoinGameCommand {
    type: 'JoinGame';
}

export interface LeaveGameCommand {
    type: 'LeaveGame';
    gameID: GameID;
}

export interface StartGameCommand {
    type: 'StartGame';
    gameID: GameID;
}

export interface GameMoveCommand<MoveType> {
    type: 'GameMove';
    gameID: GameID;
    dice: Elements[];
    move: MoveType;
}

export interface GameMove<MoveType> {
    playerID: PlayerID;
    gameID: GameID;
    move: MoveType;
}

export type AttackType = 'Normal' | 'Skill' | 'Burst';

export interface AttackMove {
    type: 'Attack';
    attackType: AttackType;
}

export interface SwapMove {
    type: 'Swap';
    isFastAction: boolean;
    target: 0 | 1 | 2;
}

export interface CovertCardMove {
    type: 'ConvertCard';
    card: Card;
}

export interface PlayCardMove {
    type: 'PlayCard';
    card: Card;
}

export interface GameState {
    status: GameStatus;
    moves: number;

    player1?: PlayerID;
    player1Ready?: boolean;

    player2?: PlayerID;
    player2Ready?: boolean;

    winner?: PlayerID;
}

export type PlayerID = string;

export interface Player {
    playerID: PlayerID,
    userName: string,
    team: Character[]
}

/**
 * This interface outlines the basic functions and enums that a non-character card should have.
 */
export interface Card {
    /**
     * Returns the card's name.
     */
    get name(): string;

    /**
     * Returns the card's description.
     */
    get description():string;

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
    use: (player: PlayerInstance, target: Character) => void;
}