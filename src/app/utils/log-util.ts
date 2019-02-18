import { environment } from "../../environments/environment";

export class LogUtil {

    public static info<T>(aObject: T, aMessage: string) {
        if (environment.loginfos) {
        console.log(' [info] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
        }
    }

    public static debug<T>(aObject: T, aMessage: string) {
        if (environment.logdebugs) {
            console.log(' [debug] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
        }
    }

    public static error<T>(aObject: T, aMessage: string) {
        console.log(' [error] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
    }

    public static logMessages<T>(aObject: T, aMessage: string) {
        if (environment.logmessages) {
            console.log(' [debug] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
        }
    }

    public static logInits<T>(aObject: T, aMessage: string) {
        if (environment.loginits) {
            console.log(' [debug] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
        }
    }

}
