import { CardModelState, Elements, Type } from "../../types/tcgTypes";
import { PlayerModel } from "../PlayerModel";
import { CharacterImpl } from "../characters/CharacterImpl";

/**
 * This abstract class implements basic card functions all non-character cards must have,
 * and required variables.
 */
export abstract class AbstractCardModel implements CardModelState {
    private _name:String;
    private _description:String;
    private _cost:number;
    private _type:Elements;
    private _isAligned:boolean;
    
    constructor(name:String, description:String, type:Elements, 
        diceCost:number, isAligned:boolean) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._cost = diceCost;
        this._isAligned = isAligned;
    }

    public get name(): String {
        return this._name;
    }

    public get description(): String {
        return this._description;
    }
    public get elementType(): Elements {
        return this._type;
    }

    abstract get cardType(): Type;
    abstract use(player: PlayerModel, target: CharacterImpl): void;

}