import { User } from '../models/user';
import { LogUtil } from '../utils/log-util';

export class LogedInMessage {

    private user: User;

    constructor(aUser: User) {
        LogUtil.debug(this, 'init login-message');
        this.user = aUser;
    }

    public getUser(): User {
        return this.user;
    }
}
