import { Category } from "./category";
import { HashUtil } from "../utils/hash-util";

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

    public category: Category;

    public tags: string;

    public rotation_strategy: string;


    private constructor(){
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