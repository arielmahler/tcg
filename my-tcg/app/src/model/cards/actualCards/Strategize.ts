import { Elements } from '../../../types/tcgTypes';
import { PlayerModel } from '../../PlayerModel';
import { CharacterImpl } from '../../characters/CharacterImpl';
import { SupportCardModel } from '../SupportCardModel'

/**
 * The class representing the Strategize card
 * https://gamewith.net/genshin-impact/article/show/37709
 */
export class Strategize extends SupportCardModel {
    
    /**
     * Builds the card as is shown in-game, unless given new parameters.
     * @param type The element type of the card.
     * @param diceCost The dice cost of the card.
     * @param isAligned If the cost must be 'Aligned'. That is, the consumed die must be the same.
     */
    constructor(type:Elements = 'Omni', diceCost:number = 1, isAligned:boolean = true) {
        super("Strategize", "Draw 2 cards.", type, diceCost, isAligned);
    }

    /**
     * Draws up to two cards, if the hand has space and the deck has two cards.
     */
    public use(player: PlayerModel, target: CharacterImpl): void {
        player.draw(2);
    }
}