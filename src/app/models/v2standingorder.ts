import { HashUtil } from '../utils/hash-util';


export class V2StandingOrder {

    /**
     * metadata
     */

    hash: string;

    username: string;


    /**
     * RotationEntry attributes
     */


    startAt: Date;

    endAt: Date;

    lastModified: Date;

    lastExecuted: Date;

    rotationStrategy: string;


    /**
     * Entry attributes
     */

    amount: number;

    currency: string;

    memo: string;

    tags: string[];


    public constructor() {
        // default;
    }

}
