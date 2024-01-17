import { Character } from "../../types/tcgTypes";

export class CharacterImpl implements Character {
    private _name:String;
    private _belongsTo:number;
    public health:number;
    public ate:boolean;

    constructor(name:String, ID:number) {
        this._name = name;
        this._belongsTo = ID;
    }
    
    get name(): String {
        return this._name;
    }

    get owner(): number {
        return this._belongsTo;
    }
}