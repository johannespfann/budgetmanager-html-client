import { Component, OnInit } from "@angular/core";
import { EncryptSerice } from "../services/encrypt.service";
import { ApplicationService } from "../application/application.service";
import { LogUtil } from "../utils/log-util";

@Component({
    selector: 'bm-encryption',
    templateUrl: './encryption.component.html'
})
export class EncryptionComponent implements OnInit {
    
    /**
     * Properties for view
     */
    public showSetEncryption: boolean = false;
    public showFirstAddEncryption: boolean = false;

    constructor(
        private applicationService: ApplicationService,
        private encryptService: EncryptSerice) {

            LogUtil.info(this,'Init EncryptComponent');
    }

    public ngOnInit(): void {
        this.encryptService.isEncrypted(this.applicationService.getCurrentUser())
            .subscribe((data: boolean) => {
                LogUtil.info(this,'Return is ' + data);
                if (!data) {
                    this.showFirstAddEncryptionView();
                }
                else {
                   this.showSetEncryptionView();
                }
            });
    }

    private showFirstAddEncryptionView(): void {
        this.showFirstAddEncryption = true;
        this.showSetEncryption = false;
    }

    private showSetEncryptionView(): void {
        this.showFirstAddEncryption = false;
        this.showSetEncryption = true;
    }

    public onSetKeyIsDone(event: boolean): void {
        if(event == true){
            this.showSetEncryptionView();
            LogUtil.info(this,'called event with value: ' + event);
        }
    }



}