package src.model.characters;

public class CharacterImpl implements Character{

    private String name;
    private int belongsTo;
    public int health;
    public boolean ate;

    CharacterImpl(String name, int ID) {
        this.name = name;
        this.belongsTo = ID;
    }

    public String getName() {
        return this.name;
    }

    public int owner() {
        return this.belongsTo;
    }
}
