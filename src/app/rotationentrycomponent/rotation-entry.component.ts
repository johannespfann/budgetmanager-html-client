import { Component } from "@angular/core";
import { RotationEntryService } from "../services/rotation-entry.service";
import { RotationEntry } from "../models/rotationentry";
import { asElementData } from "@angular/core/src/view";
import { LogUtil } from "../utils/log-util";

@Component({
    selector: 'rotation-entry-component',
    templateUrl: './rotation-entry.component.html',
    styleUrls: ['./rotation-entry.component.css']
})
export class RotationEntryComponent {


    public rotationEntries: RotationEntry[];

    public editViewIsVisiable: boolean = false;

    public selectedRotationEntry: RotationEntry;

    constructor(
        private rotationEntryService: RotationEntryService) {

        rotationEntryService.getRotationEntries().subscribe(
            (aRotationEntries: RotationEntry[]) => {
                this.rotationEntries = aRotationEntries;
            },
            error => {
                LogUtil.debug(this, 'Error was cacked! -> ' + error);
                this.rotationEntries = new Array<RotationEntry>();
            }
        )
    }

    public deleteEntry(entry: RotationEntry): void {
        this.rotationEntryService.deleteRotationEntry(entry).subscribe( data => {
            this.updateView();
        })
    }

    public editEntry(entry: RotationEntry): void {
        this.selectedRotationEntry = entry;
        this.editViewIsVisiable = true;
    }

    private updateView(): void {
        this.rotationEntryService.getRotationEntries().subscribe(
            (data: RotationEntry[]) => {
                this.rotationEntries = data;
            },
            error => {
                LogUtil.debug(this, 'Error was cacked! -> ' + error);
                this.rotationEntries = new Array<RotationEntry>();
            }
        )
    }

    public closeUpdate(aEvent: boolean){
        LogUtil.info(this,'closeUpdated was invoked: ' + aEvent);
        this.editViewIsVisiable = aEvent;
        this.updateView();
    }


}