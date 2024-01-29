import { AbstractCardModel } from './AbstractCardModel'
import { Type } from '../../types/tcgTypes'

/**
 * This class represents the 'Support' card types.
 */
export abstract class SupportCardModel extends AbstractCardModel {


    public get cardType(): Type {
        return 'Support';
    }
}