import { Injectable } from "@angular/core";
import { ApplicationService } from "../application/application.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs/Observable";
import { LogUtil } from "../utils/log-util";
import { Category } from "../models/category";

import { catchError, map, tap } from 'rxjs/operators';    

import { Observer } from "rxjs/Observer";


@Injectable()
export class CategoryRestApiService {

    private base_url: string;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient){

        LogUtil.info(this, "Init CategoryRestService");
        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
    }

    public getCategories(aUser: User): Observable<Array<Category>> {
        return this.http.get<Array<Category>>(this.base_url + 'category/all/' + aUser.name)
        .pipe(
            tap((categories: Array<Category>) => {
                // TODO FILTER
                categories.forEach(category => LogUtil.info(this, category.name))
            })
        );  
    }

    public addCategory(aUser: User,aCategory: Category): Observable<any> {
        LogUtil.info(this, "Category: " + JSON.stringify(aCategory));
        return this.http.post(this.base_url + 'category/add/' + aUser.name, JSON.stringify(aCategory));
    }

    public deleteCategory(aUser: User, aCategoryToDelete: Category, aCategoryToReplace:Category): Observable<any>{
        LogUtil.info(this, "CategoryToDelete : " + JSON.stringify(aCategoryToDelete));
        LogUtil.info(this, "CategoryToReplace: " + JSON.stringify(aCategoryToReplace));
        return this.http.delete(this.base_url + "category/delete/" + aCategoryToDelete.hash + "/replace/" + aCategoryToReplace.hash);
    }

    public updateCategory(aUser: User, aCategory): Observable<any>{
        LogUtil.info(this,"Update category: " + JSON.stringify(aCategory));
        return this.http.patch(this.base_url + "category/update/" + aCategory.hash, aCategory);
    }

    public getDefaultCategory(aUser: User): Observable<Category> {
        return this.http.get<Category>(this.base_url + "category/default/" + aUser.email);
    }
}

/*
return this.http.post(Constants.WEBSERVICE_ADDRESS + "/priceTag", null, {headers: headers})
    .map((res: Response) => {
      return new PriceTag(res.json());
    });
*/