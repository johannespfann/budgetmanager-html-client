import { Component, OnInit } from '@angular/core';
import { RotationEntryService } from '../../services/rotation-entry.service';
import { RotationEntry } from '../../models/rotationentry';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-standingorder-component',
    templateUrl: './standingorder.component.html',
    styleUrls: ['./standingorder.component.css']
})
export class StandingOrderComponent implements OnInit {

    public rotationEntries: RotationEntry[];

    public selectedStandingOrder: RotationEntry;

    public isViewVisible: boolean;

    constructor(private rotationEntryService: RotationEntryService) {
        LogUtil.debug(this, 'init standingorders');
    }

    public ngOnInit(): void {
        this.cleanView();
        this.updateStandingOrders();
    }

    public editEntry(entry: RotationEntry): void {
        this.showEditView();
        this.selectedStandingOrder = entry;
    }

    public onCancelPressed(event: boolean): void {
        this.cleanView();
    }

    public onChangedPressed(event: RotationEntry): void {
        this.rotationEntryService.updateRotationEntry(event).subscribe(
            data => {
                this.cleanView();
                this.updateStandingOrders();
            },
            error => {
                LogUtil.error(this, 'change standingorder -> ' + JSON.stringify(error));
            }
        );
    }

    public onDeletedPressed(event: RotationEntry): void {
        this.rotationEntryService.deleteRotationEntry(event).subscribe(
            data => {
                this.cleanView();
                this.updateStandingOrders();
            },
            error => {
                LogUtil.error(this, 'delete standingorder -> ' + JSON.stringify(error));
            }
        );
    }

    private updateStandingOrders() {
        this.rotationEntryService.getRotationEntries().subscribe(
            (aRotationEntries: RotationEntry[]) => {
                this.rotationEntries = aRotationEntries;
            },
            error => {
                LogUtil.error(this, 'Error was found! -> ' + JSON.stringify(error));
                this.rotationEntries = new Array<RotationEntry>();
            }
        );
    }

    private cleanView(): void {
        this.isViewVisible = false;

    }

    private showEditView(): void {
        this.isViewVisible = true;
    }

}
