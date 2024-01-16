package src.model.cards;

import java.rmi.activation.ActivationException;

import src.model.PlayerModel;

/**
 * This interface outlines the basic functions and enums that a non-character card should have.
 */
public interface CardModelState {
    
    enum Element {Hydro, Electro, Anemo, Geo, Pyro, Dendro, Cryo, Omni}
    enum Type {Equipment, Support, Event}

    /**
     * Returns the card's name.
     * @return the card's name as a 'String'.
     */
    String getName();

    /**
     * Returns the card's description.
     * @return the card's description as a 'String'.
     */
    String getDescription();

    /**
     * Returns the Element type of the card.
     * @return an 'Element' type.
     */
    Element getElementType();

    /**
     * Returns the card type.
     * @return an enum {Equipment, Support, Event}, representing card type.
     */
    Type getCardType();

    /**
     * This method applies the card's effect to the given player.
     * @param player The player the card will effect.
     * @throws ActivationException If the effect cannot trigger.
     */
    void use(PlayerModel player) throws ActivationException;

}
