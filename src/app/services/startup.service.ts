

import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";

@Injectable()
export class StartupService {

    public onStartup(){
        LogUtil.info(this,'onStartup');
    }

}