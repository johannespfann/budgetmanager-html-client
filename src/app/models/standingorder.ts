import { HashUtil } from '../utils/hash-util';
import { Tag } from './tag';

export class StandingOrder {

    /**
     * metadata
     */

    public hash: string;

    public username: string;


    /**
     * RotationEntry attributes
     */


    public start_at: Date;

    public end_at: Date;

    public last_modified: Date;

    public last_executed: Date;

    public rotation_strategy: string;


    /**
     * Entry attributes
     */

    public amount: number;

    public currency: string;

    public memo: string;

    public tags: Tag[];


    public constructor() {
        // default;
    }

    public static create(aAmount: number, aCurrency: string, aRotation_strategy: string): StandingOrder {
        const rotationEntry: StandingOrder = new StandingOrder();
        rotationEntry.amount = aAmount;
        rotationEntry.currency = aCurrency;
        rotationEntry.rotation_strategy = aRotation_strategy;
        rotationEntry.hash = HashUtil.getUniqueHash().toString();
        return rotationEntry;
    }


    public static copy(aStandingOrder: StandingOrder): StandingOrder {
        const standingOrder: StandingOrder = new StandingOrder();

        standingOrder.hash = aStandingOrder.hash;
        standingOrder.amount = aStandingOrder.amount;
        standingOrder.currency = aStandingOrder.currency;
        standingOrder.memo = aStandingOrder.memo;
        standingOrder.tags = aStandingOrder.tags;
        standingOrder.username = aStandingOrder.username;
        standingOrder.start_at = aStandingOrder.start_at;
        standingOrder.end_at = aStandingOrder.end_at;
        standingOrder.last_modified = aStandingOrder.last_modified;
        standingOrder.last_executed = aStandingOrder.last_executed;
        standingOrder.rotation_strategy = aStandingOrder.rotation_strategy;
        return standingOrder;
    }
}
