import { User } from "../models/user";

export class LogedInMessage{

    private user:User;

    constructor(aUser: User){
        this.user = aUser;
    }

    public getUser():User{
        return this.user;
    }
    
}