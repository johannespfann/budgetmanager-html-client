import { Component } from "@angular/core";

import { Category } from "../models/category";
import { Tag } from "../models/tag";
import { Entry } from "../models/entry";


@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html'
})
export class AddEntryComponent {

    sum: number;

    memo: string;

    current_date: string;

    category: Category;

    tags: Array<Tag>;

    constructor(){
        console.log('Invoke AddEntryComponent');
    }


    save(){
        let entry:Entry;

        entry.sum = this.sum;
        entry.memo = this.memo;
        entry.current_date = this.current_date;
        entry.tags = this.tags;

        // TODO save entry

        console.log('save : ' + entry);

    }

}