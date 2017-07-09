export class LogUtil{

    public static info(aMessage:string) {
        console.log('[info] ' + aMessage);
    }

    public static debug(aMessage: string) {
        console.log('[debug] ' + aMessage);
    }

    public static error(aMessage: string) {
        console.log('[error] ' + aMessage);
    }

}