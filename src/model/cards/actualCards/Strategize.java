package src.model.cards.actualCards;

import java.rmi.activation.ActivationException;

import src.model.PlayerModel;
import src.model.cards.SupportCardModel;
import src.model.characters.CharacterImpl;

/**
 * The class representing the Strategize card
 * https://gamewith.net/genshin-impact/article/show/37709
 */
public class Strategize extends SupportCardModel {

    /**
     * The inherited constructor, useful for testing/modifying the card.
     * @param type The element type of the card.
     * @param diceCost The dice cost of the card.
     * @param isAligned If the cost must be 'Aligned'. That is, the consumed die must be the same.
     */
    public Strategize(Element type, int diceCost, boolean isAligned) {
        super("Strategize", "Draw 2 cards.", type, diceCost, isAligned);
    }

    /**
     * The default constructor, which builds the card as is shown in-game.
     */
    public Strategize() {
        super("Strategize", "Draw 2 cards.", Element.Omni, 1, true);
    }

    /**
     * Draws up to two cards, if the hand has space and the deck has two cards.
     */
    public void use(PlayerModel player) {
        player.draw(2);
    }

    @Override
    public void use(PlayerModel player, CharacterImpl target) throws ActivationException {
        this.use(player);
    }
    
}
