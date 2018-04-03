

export class AppConfiguration{

    private server_url;

    constructor(){

    }

    public getBaseUrl(): string {
        return "http://localhost:8081/budget/";
    }
}