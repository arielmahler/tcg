import { Character, Elements } from "../../types/tcgTypes";
import AbstractCharacter from "./AbstractCharacter";

/**
 * Class representing Diluc
 * https://gamewith.net/genshin-impact/article/show/37661
 */
export default class Diluc extends AbstractCharacter {
    
    private _normalAttackCost:Elements[] = ['Pyro', 'Omni', 'Omni'];
    private _skillCost:Elements[] = ['Pyro', 'Pyro', 'Pyro'];
    private _burstCost:Elements[] = ['Pyro', 'Pyro', 'Pyro', 'Pyro'];

    constructor() {
        super('Diluc', 'Pyro', 'Claymore');
    }
    
    get normalAttackCost(): Elements[] {
        return this._normalAttackCost;
    }
    useNormalAttack(target: Character) {
        target.takeDamage(2);
    }

    get skillCost(): Elements[] {
        return this._skillCost;
    }
    useSkill() {
        throw new Error("Method not implemented.");
    }

    get burstCost(): Elements[] {
        return this._burstCost;
    }
    useBurst() {
        throw new Error("Method not implemented.");
    }
    
}