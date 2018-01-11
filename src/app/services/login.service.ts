import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http/src/response";

@Injectable()
export class LoginService {
    
    private user: User;

    private baseURL: string = "http://192.168.2.103:8081/budget/";
    //private baseURL: string = "http://192.168.2.106:8081/budget/";

    constructor(
        private http: HttpClient) {
            
        LogUtil.info(this,'Init LoginService');


    }

    public registerUser(aUser: User, aPassword: String): Observable<any>{
        return this.http.post(this.baseURL + "user/register/" + aUser.name + "/email/" + aUser.email, aPassword);
    }

    public activateUser(aName: String, aCode: String): Observable<any> {
        LogUtil.info(this,"send activationcode for: " + aName + " with " + aCode);
        return this.http.post(this.baseURL + "user/activate/" + aName, aCode);
    }

    public resendActivationEmail(aName: string, aEmail: string): Observable<any> {
        return this.http.post(this.baseURL + "activate/resendemail/username/" + aName + "/email/" + aEmail,"");
    }



}