import IllegalPlayError, { FULL_CHARACTER, ILLEGAL_CHARACTER } from "../../../types/IllegalPlayError";
import { Elements, Character } from "../../../types/tcgTypes";
import Player from '../../../lib/Player'
import { SupportCardModel } from "../SupportCardModel";


/**
 * The class representing the Sweet Madame card
 * https://gamewith.net/genshin-impact/article/show/37554
 */
export class SweetMadame extends SupportCardModel {

    /**
     * Builds the card as is shown in-game, unless given new parameters.
     * @param type The element type of the card.
     * @param diceCost The dice cost of the card.
     * @param isAligned If the cost must be 'Aligned'. That is, the consumed die must be the same.
     */
    constructor(type:Elements = 'Omni', diceCost:number = 0, isAligned:boolean = true) {
        super("Sweet Madame",
            "Heal the target character for 1 HP.",
            type,
            diceCost,
            isAligned);
    }

    use(player: Player, target: Character): void {
        // If the character does not belong to the player, fail.
        if (target.owner != player.pID) {
            throw new IllegalPlayError(ILLEGAL_CHARACTER);
        }
        if (target.ate) {
            throw new IllegalPlayError(FULL_CHARACTER);
        }
        target.health += 1;
        target.ate = true;
    }

}