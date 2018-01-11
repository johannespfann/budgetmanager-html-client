import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent{

    private identifier: string;

    private password: string;

    private accessToken: string;


    constructor(private route: ActivatedRoute){
        LogUtil.info(this,'Init LoginComponent');

        this.identifier = route.snapshot.paramMap.get('email');
    }
}