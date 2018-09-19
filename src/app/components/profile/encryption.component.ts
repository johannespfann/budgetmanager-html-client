import { Component, OnInit } from '@angular/core';
import { EncryptSerice } from '../../services/encrypt.service';
import { ApplicationService } from '../../application/application.service';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'bm-encryption',
    templateUrl: './encryption.component.html'
})
export class EncryptionComponent implements OnInit {
    /**
     * Properties for view
     */
    public showSetEncryption = false;
    public showFirstAddEncryption = false;

    constructor(
        private applicationService: ApplicationService,
        private encryptService: EncryptSerice) {

            LogUtil.info(this, 'Init EncryptComponent');
    }

    public ngOnInit(): void {
        const baseUrl = this.applicationService.getBaseUrl();
        const user = this.applicationService.getCurrentUser();
        this.encryptService.isEncrypted(baseUrl, user)
            .subscribe((data: boolean) => {
                LogUtil.info(this, 'Return is ' + data);
                if (!data) {
                    this.showFirstAddEncryptionView();
                } else {
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
        if (event === true) {
            this.showSetEncryptionView();
            this.applicationService.setEncryptionKeyAsDefined();
            LogUtil.info(this, 'called event with value: ' + event);
        }
    }

    public onTestKeyIsDone(event: boolean): void {
        LogUtil.info(this, 'onTestKeyIsDone');

    }
}
