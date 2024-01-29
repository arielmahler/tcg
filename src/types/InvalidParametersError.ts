export const INVALID_COMMAND_MESSAGE = 'Invalid command';

export const GAME_FULL_MESSAGE = 'Game is full';
export const GAME_NOT_IN_PROGRESS_MESSAGE = 'Game is not in progress';
export const GAME_OVER_MESSAGE = 'Game is over';
export const GAME_ID_MISSMATCH_MESSAGE = 'Game ID mismatch';

export const GAME_NOT_STARTABLE_MESSAGE = 'Game is not startable';

export const PLAYER_NOT_IN_GAME_MESSAGE = 'Player is not in this game';
export const PLAYER_ALREADY_IN_GAME_MESSAGE = 'Player is already in this game';
export const PLAYER_ALREADY_HAS_CHARACTER_MESSAGE = 'Player already has this character';
export const MOVE_NOT_YOUR_TURN_MESSAGE = 'It is not your turn';

export const CHARACTER_LIST_FULL_MESSAGE = 'Player already has 3 characters';
export const CHARACTER_HAS_OWNER_MESSAGE = 'Someone already owns this character';
export const CHARACTER_HAS_NO_OWNER_MESSAGE = 'no one owns this character';


export default class InvalidParametersError extends Error {
  public message: string;

  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}
