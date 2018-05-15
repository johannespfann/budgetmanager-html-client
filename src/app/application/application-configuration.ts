

export class AppConfiguration{

    private server_url;

    private password;

    constructor(aBaseUrl: string, aCryptPassword: string){
        this.server_url = aBaseUrl;
        this.password = aCryptPassword;
    }
    // environment
    public getBaseUrl(): string {
        return this.server_url;
        //return "http://localhost:8081/budget/";
    }

    public getCryptPassword(): string {
        return this.password;
    }
}