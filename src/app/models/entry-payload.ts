import { Tag } from './tag';


export class EntryPayload {

    public amount: number;

    public currency: string;

    public memo: string;

    public tags: Tag[];

}
