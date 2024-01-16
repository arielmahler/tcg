package src.model.characters;

public class CharacterImpl implements Character{

    private String name;
    public int health;

    CharacterImpl(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
    
}
