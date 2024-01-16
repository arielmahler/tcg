package src.model;

import java.io.PrintStream;
import java.rmi.activation.ActivationException;
import java.util.EmptyStackException;
import java.util.List;
import java.util.Stack;

import src.model.cards.CardModelState;
import src.model.characters.CharacterImpl;

/**
 * This class represents the player model. That is, the deck, characters, and on-field effects 
 * this player has in play.
 */
public class PlayerModel {

    private Stack<CardModelState> deck;
    private List<CardModelState> hand; // This has a limit of 10
    final CharacterImpl[] CHARACTERS; // This has a limit of 3, and is unchangeable
    private int inPlayChar;
    private PrintStream logger;

    public PlayerModel(CardModelState[] deck, CharacterImpl c1, CharacterImpl c2, CharacterImpl c3) {
        this.deck = new Stack<CardModelState>();
        for (CardModelState card : deck) {
            this.deck.push(card);
        }
        for (int i = 0; i < 5; i++) {
            this.hand.add(this.deck.pop());
        }
        this.CHARACTERS = new CharacterImpl[]{c1, c2, c3};
        this.inPlayChar = 0;
        this.logger = System.out;
    }

    /**
     * Draw the given number of cards from the deck, if possible.
     * @param numOfCards the number of cards to draw.
     */
    public void draw(int numOfCards) {
        int space = 10 - this.hand.size();
        int cardsDrawn = 0;
        // truncate to fit hand
        numOfCards = (numOfCards > space) ? numOfCards : space;
        for (int i = 0; i < numOfCards; i++) {
            try {
                this.hand.add(this.deck.pop());
                cardsDrawn++;
            } catch (EmptyStackException e) {
                // Leave early, we ran out of cards
                break;
            }
        }
        this.logger.println(String.format("Drew %d cards.", cardsDrawn));
    }

    /**
     * Changes the active character to the one at the given index, provided they are alive.
     * @param newChar The index of the new character.
     * @throws ActivationException If the character is dead.
     * @throws IndexOutOfBoundsException If the given index is out of bounds.
     */
    public void changeCharacter(int newChar) throws ActivationException, IndexOutOfBoundsException {
        if (newChar < 0 || newChar > 2) {
            throw new IndexOutOfBoundsException("Choice out of range.");
        }
        if (this.CHARACTERS[newChar].health <= 0) {
            throw new ActivationException("Character is dead.");
        }
        this.inPlayChar = newChar;
        this.logger.println("Swapped character to " + this.CHARACTERS[newChar].getName() + ".");
    }
}
