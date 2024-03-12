import InvalidParametersError, { CHARACTER_HAS_NO_OWNER_MESSAGE, CHARACTER_HAS_OWNER_MESSAGE, INVALID_COMMAND_MESSAGE } from "../../types/InvalidParametersError";
import { Character, CharacterHealth, Elements, PlayerID, WeaponType } from "../../types/tcgTypes";

export default abstract class AbstractCharacter implements Character {
    private readonly _name:string;
    private readonly _element:Elements;
    private readonly _weapon:WeaponType;
    private _owner?:PlayerID;
    public health:CharacterHealth;
    public ate:boolean;

    constructor(name:string, element:Elements, weapon:WeaponType) {
        this._name = name;
        this._element = element;
        this._weapon = weapon;
        this.health = 10;
        this.ate = false;
    }

    get name(): string {
        return this._name;
    }

    abstract get normalAttackCost(): Elements[];
    abstract get skillCost(): Elements[];
    abstract get burstCost(): Elements[];

    /**
     * Returns the PlayerID of the owning player
     * @throws InvalidParametersError(CHARACTER_HAS_NO_OWNER_MESSAGE) if no owner
     */
    get owner(): PlayerID {
        if (this._owner === undefined) {
            throw new InvalidParametersError(CHARACTER_HAS_NO_OWNER_MESSAGE);
        }
        return this._owner;
    }

    /**
     * Sets the PlayerID of the owning player
     * @throws InvalidParametersError(CHARACTER_HAS_OWNER_MESSAGE) if an owner exists
     */
    set owner(player: PlayerID) {
        if (this._owner !== undefined) {
            throw new InvalidParametersError(CHARACTER_HAS_OWNER_MESSAGE);
        }
        this._owner = player;
    }

    /**
     * Deals damage to this character. Includes a cast to `CharacterHealth`
     * @param value The amount of damage to deal
     */
    takeDamage(value: number): void {
        if (value < 0) {
            throw new InvalidParametersError(INVALID_COMMAND_MESSAGE);
        }
        let health:number = this.health;
        if (health - value < 0) {
            this.health = 0;
        } else {
            this.health = (this.health - value) as CharacterHealth;
        }
    }

    abstract useNormalAttack(target?: Character): void;
    abstract useSkill(target?: Character): void;
    abstract useBurst(target?: Character): void;
}