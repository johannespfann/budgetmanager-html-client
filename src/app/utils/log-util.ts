export class LogUtil{

    public static info<T>(aObject: T,aMessage:string) {
        console.log((<any>aObject.constructor).name + ' [info] ' + aMessage);
    }

    public static debug<T>(aObject: T,aMessage: string) {
        console.log((<any>aObject.constructor).name + ' [debug] ' + aMessage);
    }

    public static error<T>(aObject: T,aMessage: string) {
        console.log((<any>aObject.constructor).name + ' [error] ' + aMessage);
    }

    public static logMessages<T>(aObject: T,aMessage: string) {
        console.log((<any>aObject.constructor).name + ' [info] ' + aMessage);
    }
}