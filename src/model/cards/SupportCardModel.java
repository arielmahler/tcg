package src.model.cards;

/**
 * This class represents the 'Support' card types.
 */
public abstract class SupportCardModel extends AbstractCardModel {

    public SupportCardModel(String name, String description, Element type, int diceCost, boolean isAligned) {
        super(name, description, type, diceCost, isAligned);
        //TODO Auto-generated constructor stub
    }

    @Override
    public Type getCardType() {
        return Type.Support;
    }
    
}
