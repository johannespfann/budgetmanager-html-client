import { Tag } from "./tag";

export class EntryServer {

    public hash:string;

    public amount: string;

    public memo: string;

    public created_at: Date;

    public tags:Array<Tag>;

}