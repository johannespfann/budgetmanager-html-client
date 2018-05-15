import { Component, Output, EventEmitter } from "@angular/core";
import { EncryptSerice } from "../services/encrypt.service";
import { LogUtil } from "../utils/log-util";
import { ApplicationService } from "../application/application.service";
import { CryptUtil } from "../utils/crypt-util";

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
        private encryptService: EncryptSerice){
    }

    public saveKey(): void {
        if(this.isCorrectKey(this.key,this.keyrepeat)){     
           this.encryptService
            .setEncryptionText(this.applicationService.getCurrentUser(),CryptUtil.encryptString(this.key,this.validationText))
            .subscribe( data => {
                LogUtil.info(this, 'Saved text: ' + this.validationText + ' :with key ' + this.key);

                this.setKeyIsDone.emit(true);
            });
        }
    }

    private isCorrectKey(key: string, keyrepeat: string): boolean {
        if(!(key.length > 0)){
            LogUtil.info(this,"key war leer: " + key);
            return false;
        }
        if(key == keyrepeat){
            LogUtil.info(this,"key gleich mit keyrepeat: " + key + ' ' + keyrepeat);
            return true;
        }
        LogUtil.info(this,"return false: " + key + ' ' + keyrepeat);
        return false;
    }
}