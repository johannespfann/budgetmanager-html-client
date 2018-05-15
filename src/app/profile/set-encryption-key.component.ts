import { Component } from "@angular/core";
import { ApplicationService } from "../application/application.service";
import { EncryptSerice } from "../services/encrypt.service";
import { CryptUtil } from "../utils/crypt-util";
import { LogUtil } from "../utils/log-util";

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
        private encryptService: EncryptSerice){

            this.key = localStorage.getItem("encryptkey");
  
    }

    public testKey(): void {
        this.encryptService.getEncryptionText(this.applicationService.getCurrentUser())
        .subscribe( (data: string) => {
            LogUtil.info(this,'--> Returned: ' + data);
            this.encryptedValidationText = CryptUtil.decryptString(this.key,data);
            this.pressedValidateTest = true;
        });
    }

    public saveKey(): void {
        localStorage.setItem("encryptkey",this.key);
    }
}
