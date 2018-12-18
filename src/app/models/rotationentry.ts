import { HashUtil } from '../utils/hash-util';
import { Tag } from './tag';

export class RotationEntry {

    /**
     * RotationEntry attributes
     */

    public hash: string;

    public start_at: Date;

    public end_at: Date;

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

    public static create(aAmount: number, aCurrency: string, aRotation_strategy: string): RotationEntry {
        const rotationEntry: RotationEntry = new RotationEntry();
        rotationEntry.amount = aAmount;
        rotationEntry.rotation_strategy = aRotation_strategy;
        rotationEntry.hash = HashUtil.getUniqueHash().toString();
        return rotationEntry;
    }
}
