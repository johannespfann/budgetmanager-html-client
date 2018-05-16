import { Component } from "@angular/core";
import { ApplicationService } from "../application/application.service";
import { EncryptSerice } from "../services/encrypt.service";
import { CryptUtil } from "../utils/crypt-util";
import { LogUtil } from "../utils/log-util";
import { MessagingService } from "../messages/message.service";
import { EncryptionReadyMessage } from "../messages/encryption-ready-message";

@Component({
    selector: 'bm-set-encryption-key',
    templateUrl: './set-encryption-key.component.html'
})
export class SetEncryptionKeyComponent {

    public key: string = '';

    public encryptedValidationText: string = '';

    public pressedValidateTest: boolean;

    constructor(
        private applicationService: ApplicationService,
        private encryptService: EncryptSerice,
        private messageService: MessagingService) {

        this.key = localStorage.getItem("encryptkey");

    }

    public testKey(): void {
        this.encryptService.getEncryptionText(this.applicationService.getCurrentUser())
            .subscribe((data: any) => {
                LogUtil.info(this, '--> Returned: ' + data);
                this.encryptedValidationText = CryptUtil.decryptString(this.key, data.text);
                this.pressedValidateTest = true;
            });
    }

    public saveKey(): void {
        if (this.pressedValidateTest) {
            localStorage.setItem("encryptkey", this.key);
            this.messageService.publish(new EncryptionReadyMessage());
        }
    }
}
