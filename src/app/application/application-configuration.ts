

export class AppConfiguration{

    private server_url;

    constructor(){

    }

    public getBaseUrl(): String {
        return "http://192.168.2.103:8081/budget/";
    }
}