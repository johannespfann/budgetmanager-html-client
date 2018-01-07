import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'bm-activate',
    templateUrl: './activate.component.html'    
})
export class ActivateComponent{
    
    private username: string;

    constructor(private route: ActivatedRoute){
        LogUtil.info(this,'Init ActivateComponent');
        this.username = route.snapshot.paramMap.get('username');

        //this.user = route.snapshot.data()

    }
}