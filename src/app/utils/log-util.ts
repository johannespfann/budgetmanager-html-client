export class LogUtil {

    public static info<T>(aObject: T, aMessage: string) {
        console.log(' [info] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
    }

    public static debug<T>(aObject: T, aMessage: string) {
        console.log(' [debug] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
    }

    public static error<T>(aObject: T, aMessage: string) {
        console.log(' [error] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
    }

    public static logMessages<T>(aObject: T, aMessage: string) {
        if (false) {
            console.log(' [info] ' + (<any>aObject.constructor).name + ' : ' + aMessage);
        }
    }

}
