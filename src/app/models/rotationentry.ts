import { HashUtil } from "../utils/hash-util";
import { Tag } from "./tag";

export class RotationEntry{

    /**
     * RotationEntry attributes
     */

    public hash:string;

    public start_at:Date;

    public end_at:Date;

    public last_executed: Date;


        /**
     * Entry attributes 
     */

    public amount: number;

    public memo: string;

    public tags: Tag[];

    public rotation_strategy: string;


    public constructor(){
        // default;
    }

    public static create(aAmount: number, aRotation_strategy: string): RotationEntry {
        let rotationEntry: RotationEntry = new RotationEntry();
        rotationEntry.amount = aAmount;
        rotationEntry.rotation_strategy = aRotation_strategy;
        rotationEntry.hash = HashUtil.getUniqueHash(aAmount.toString() + aRotation_strategy);
        return rotationEntry;
    }
}