import { Tag } from '../models/tag';

export class StandingOrderPayload {

    /**
     * RotationEntry attributes
     */

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

}
