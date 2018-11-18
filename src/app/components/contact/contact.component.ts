import { Component } from "@angular/core";
import { ContactService } from "../../services/contact-service";
import { LogUtil } from "../../utils/log-util";
import { ContactMessage } from "../../models/contact-message";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    public name: string;

    public email: string;

    public message: string;

    constructor(private contactService: ContactService) {
        LogUtil.info(this, "init contactcomponent")
    }

    public sendMessage(): void {

        LogUtil.info(this, 'name ' + this.name);
        LogUtil.info(this, 'email' + this.email);
        LogUtil.info(this, 'msg  ' + this.message);

        let message: ContactMessage = new ContactMessage();
        message.name = this.name;
        message.email = this.email;
        message.message = this.message;
        
        this.contactService.send(message).subscribe(
            data => {
                LogUtil.info(this, 'worked fine!');
            },
            error => {
                LogUtil.info(this, 'error');
            }
        );
    }
        
}