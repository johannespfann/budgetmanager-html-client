import { Tag } from './tag';

export class RotationEntryServer {
    /**
     * RotationEntry attributes
     */

    public hash: string;

    public start_at: Date;

    public end_at: Date;

    public last_executed: Date;


    /**
     * Entry attributes
     */

    public amount: string;

    public currency: string;

    public memo: string;

    public tags: Tag[];

    public rotation_strategy: string;
}
