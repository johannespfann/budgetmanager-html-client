import { Component, Output, EventEmitter } from "@angular/core";
import { EncryptSerice } from "../services/encrypt.service";
import { LogUtil } from '../utils/log-util';
import { ApplicationService } from '../application/application.service';
import { CryptUtil } from '../utils/crypt-util';

@Component({
    selector: 'bm-first-add-encryption',
    templateUrl: './first-add-encryption.component.html'
})
export class FirstAddEncryptionComponent{

    @Output()
    public setKeyIsDone = new EventEmitter<boolean>();

    public key: string;

    public keyrepeat: string;

    public validationText: string;

    constructor(
        private applicationService: ApplicationService,
        private encryptService: EncryptSerice) {
    }

    public saveKey(): void {
        if(this.isCorrectKey(this.key,this.keyrepeat)) {
            const baseUrl: string = this.applicationService.getApplicationConfig().getBaseUrl();
           this.encryptService
            .setEncryptionText(baseUrl, this.applicationService.getCurrentUser(), CryptUtil.encryptString(this.key,this.validationText))
            .subscribe( data => {
                this.setKeyIsDone.emit(true);
            });
        }
    }

    private isCorrectKey(key: string, keyrepeat: string): boolean {
        if (!(key.length > 0)) {
            return false;
        }
        if (key === keyrepeat) {
            return true;
        }
        return false;
    }
}