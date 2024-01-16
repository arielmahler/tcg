package src.model.cards;

/**
 * This abstract class implements basic card functions all non-character cards must have,
 * and required variables.
 */
public abstract class AbstractCardModel implements CardModelState {
    
    private String name;
    private String description;
    private int cost;
    private Element type;
    private boolean isAligned;
    
    public AbstractCardModel(String name, String description, Element type, 
        int diceCost, boolean isAligned) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.cost = diceCost;
        this.isAligned = isAligned;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Element getElementType() {
        return this.type;
    }

}
