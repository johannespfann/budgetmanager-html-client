import { LogUtil } from "../utils/log-util";
import { MessagingService } from "./message.service";
import { Subscription } from "rxjs";
import { LogedInMessage } from "./logedin-message";
import { User } from "../models/user";



export class ApplicationService {

    private loginSubscription: Subscription;

    private user: User;

    constructor(
        private messageService: MessagingService) {

        LogUtil.info(this, "Init ApplicationService");

        this.loginSubscription = messageService
            .of(LogedInMessage)
            .subscribe(
            (message: LogedInMessage) => {
                this.user = message.getUser();
            });

    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }






}