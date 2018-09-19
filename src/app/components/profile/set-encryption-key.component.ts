import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { ApplicationService } from '../../application/application.service';
import { EncryptSerice } from '../../rest/encrypt-api.service';
import { CryptUtil } from '../../utils/crypt-util';
import { LogUtil } from '../../utils/log-util';
import { MessagingService } from '../../messages/message.service';
import { EncryptionReadyMessage } from '../../messages/encryption-ready-message';
import { EncryptionFacade } from '../../utils/encryption-facade';
import { User } from '../../models/user';

@Component({
    selector: 'bm-set-encryption-key',
    templateUrl: './set-encryption-key.component.html'
})
export class SetEncryptionKeyComponent {

    @Output()
    public testKeyIsDone = new EventEmitter<boolean>();

    public key: string = String();
    public isClickedRemember: boolean;
    public encryptedValidationText: string = String();
    public pressedValidateTest: boolean;

    private encryptionFacade: EncryptionFacade;
    private user: User;

    constructor(
        private applicationService: ApplicationService,
        private encryptService: EncryptSerice,
        private messageService: MessagingService,
        private elRef: ElementRef,
    ) {
        this.encryptionFacade = new EncryptionFacade();
        this.user = applicationService.getCurrentUser();
        if (this.user) {
            if (this.encryptionFacade.isEncryptionSaved(this.user)) {
                this.key = this.encryptionFacade.getEncryptionKey(this.user);
                this.isClickedRemember = true;
            }
        }
    }

    public testKey(): void {
        LogUtil.info(this, 'Pressed testkey');
        const baseUrl = this.applicationService.getBaseUrl();
        const user = this.applicationService.getCurrentUser();
        this.encryptService.getEncryptionText(baseUrl, user)
            .subscribe((data: any) => {
                this.encryptedValidationText = CryptUtil.decryptString(this.key, data.text);
                this.pressedValidateTest = true;
            });
    }

    public saveKey(): void {
        LogUtil.info(this, 'Pressed saveKey');
        if (this.pressedValidateTest) {
            this.applicationService.setEncryptionKey(this.key);
            if (this.isClickedRemember) {
                this.encryptionFacade.saveEncryptionKey(this.applicationService.getCurrentUser(), this.key);
            }
            LogUtil.info(this, 'save encryptionkey to applicationservice: ' + this.key);
            this.applicationService.setEncryptionKey(this.key);
            this.testKeyIsDone.emit(true);
            this.messageService.publish(new EncryptionReadyMessage());
        }
    }

    public switchRememberCheckbox(): void {
        if (this.isClickedRemember) {
            this.isClickedRemember = false;
            this.encryptionFacade.deleteLocalStoredEncryptionKey(this.applicationService.getCurrentUser());
        } else {
            this.isClickedRemember = true;
        }
    }

    private resetView(): void {
        this.isClickedRemember = false;
        this.key = String();
        this.encryptedValidationText = String();
        this.pressedValidateTest = false;
    }
}
