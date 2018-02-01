import { Injectable } from "@angular/core";
import { ApplicationService } from "../application/application.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs/Observable";
import { LogUtil } from "../utils/log-util";
import { Category } from "../models/category";

import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class CategoryRestApiService {

    private base_url: string;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient){

        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
    }

    public getCategories(aUser: User): Observable<Array<Category>> {
        return this.http.get<Array<Category>>(this.base_url + 'category/all/' + aUser.name)
        .pipe(
            tap((categories: Array<Category>) => {
                categories.forEach(category => LogUtil.info(this, category.name))
            })
        );
    }

}

/*
return this.http.post(Constants.WEBSERVICE_ADDRESS + "/priceTag", null, {headers: headers})
    .map((res: Response) => {
      return new PriceTag(res.json());
    });
*/