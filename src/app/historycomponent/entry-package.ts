import { Entry } from '../models/entry';

export class EntryPackage {

    public packagename: string;

    public date: Date;

    public entries: Entry[] = [];

}
