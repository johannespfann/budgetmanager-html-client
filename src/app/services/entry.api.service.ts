import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class EntryAPIService{

    private url: string = "http://localhost:8081/myapp/home/hello";

    constructor(private http: HttpClient){
        LogUtil.info(this,"Init EntryAPIService");
    }

    public getContent(): Observable<any> {
        return this.http.get<any>(this.url);
    }

}