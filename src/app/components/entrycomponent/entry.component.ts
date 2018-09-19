import { Component } from '@angular/core';
import { EntryInfo } from './entry-info';

@Component({
    selector: 'bm-entry-info',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.css']
})
export class EntryComponent {

    public entryInfo: EntryInfo;

    constructor(){
    }

    

}
