import { User } from '../models/user';
import { Message } from './message';

export class LogedInMessage extends Message {

    private user: User;

    constructor(aUser: User) {
        super('LogedInMessage');
        this.user = aUser;
    }

    public getUser(): User {
        return this.user;
    }
}
