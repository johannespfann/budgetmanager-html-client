

export class AppConfiguration{

    private server_url;

    constructor(){

    }
    // environment
    public getBaseUrl(): string {
        //return "http://pfann.org:8081/budget/";
        return "http://localhost:8081/budget/";
    }
}