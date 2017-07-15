import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";

@Component({
    selector: "login",
    templateUrl: "./login.component.html"
})
export class LoginComponent{

    constructor(){
        LogUtil.info(this,'Init LoginComponent');
    }
}