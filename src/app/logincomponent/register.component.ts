import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";


@Component({
    selector: 'bm-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent{

    private name;
    private email;
    private password;
    private passwordrepeat;


    constructor(){
        LogUtil.info(this,'Init RegisterComponent');
    }


    public pressRegister(){

        LogUtil.info(this,'pressed register');

        

    }

}