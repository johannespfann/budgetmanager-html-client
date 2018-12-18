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
        let message: ContactMessage = new ContactMessage();
        message.name = this.name;
        message.email = this.email;
        message.message = this.message;
        this.sendEmail(message);
    }

    private sendEmail(aMessage: ContactMessage): void {
        this.contactService.send(aMessage).subscribe(
            data => {
                LogUtil.info(this, 'worked fine!');
                this.cleanView();
            },
            error => {
                LogUtil.info(this, 'error -> ' + JSON.stringify(error));
            }
        );
    }

    private cleanView(): void {
        this.name = "";
        this.email = "";
        this.message = "";
    }
}
