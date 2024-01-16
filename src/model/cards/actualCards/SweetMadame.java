package src.model.cards.actualCards;

import java.rmi.activation.ActivationException;

import src.model.PlayerModel;
import src.model.cards.SupportCardModel;
import src.model.characters.CharacterImpl;

/**
 * The class representing the Sweet Madame card
 * https://gamewith.net/genshin-impact/article/show/37554
 */
public class SweetMadame extends SupportCardModel {

    /**
     * The inherited constructor, useful for testing/modifying the card.
     * @param type The element type of the card.
     * @param diceCost The dice cost of the card.
     * @param isAligned If the cost must be 'Aligned'. That is, the consumed die must be the same.
     */
    public SweetMadame(Element type, int diceCost, boolean isAligned) {
        super("Sweet Madame",
            "Heal the target character for 1 HP.",
            type,
            diceCost,
            isAligned);
    }

    /**
     * The default constructor, which builds the card as is shown in-game.
     */
    public SweetMadame() {
        super("Sweet Madame",
        "Heal the target character for 1 HP.",
        Element.Omni,
        0,
        true);
    }

    /**
     * Heals The target character for 1HP.
     */
    public void use(PlayerModel player) throws ActivationException {
        throw new ActivationException("Card must have a target to use.");
    }

    /**
     * Heals The target character for 1HP. The target must belong to the given player.
     */
    public void use(PlayerModel player, CharacterImpl target) throws ActivationException {
        // If the character does not belong to the player, fail.
        if (target.owner() != player.pID()) {
            throw new ActivationException("You don't own that character.");
        }
        if (target.ate) {
            throw new ActivationException("Character is full.");
        }
        target.health += 1;
        target.ate = true;
    }
    
}
