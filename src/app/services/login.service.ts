import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";


@Injectable()
export class LoginService {
    
    constructor() {
        LogUtil.info(this,'Init LoginService');
    }

       
}