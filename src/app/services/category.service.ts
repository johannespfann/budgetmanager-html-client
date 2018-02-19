import { Injectable } from '@angular/core';
import { Category } from "../models/category";
import { LogUtil } from "../utils/log-util";
import { HashUtil } from "../utils/hash-util";
import { MessagingService } from "../messages/message.service";
import { CategoryUpdatedMessage } from "../messages/category-updated-message";
import { CategoryAddedMessage } from "../messages/category-added-message";
import { CategoryDeletedMessage } from "../messages/category-deleted-message";
import { CategoryRestApiService } from './category-rest-api.service';
import { ApplicationService } from '../application/application.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class CategoryService {

    private defaultCategory: Category;

    private categories: Array<Category>;

    constructor(
        private messageService: MessagingService,
        private appService: ApplicationService,
        private categoryRestService: CategoryRestApiService
    ) {
        LogUtil.info(this, "Init CategoryService");

        categoryRestService.getDefaultCategory(this.appService.getCurrentUser()).subscribe(
            data => this.defaultCategory = data
        )
    }

    public update(aCategory: Category): void {
        this.categoryRestService.updateCategory(this.appService.getCurrentUser(), aCategory)
            .subscribe(data => this.messageService.publish(new CategoryUpdatedMessage(Category.copy(aCategory)))
        );
    }

    public getDefaultCategory(): Observable<Category> {
        return this.categoryRestService.getDefaultCategory(this.appService.getCurrentUser())
    
    }

    public getCategories(): Observable<Array<Category>> {
        return this.categoryRestService.getCategories(this.appService.getCurrentUser());
    }


    public addNewCategory(aCategory: Category): void {
        this.categoryRestService.addCategory(this.appService.getCurrentUser(),aCategory).subscribe(
            data => this.messageService.publish(new CategoryAddedMessage(Category.copy(aCategory)))
        );
        LogUtil.debug(this, "Added new Category: " + JSON.stringify(aCategory));
    }

    public delete(aCategory: Category, aFallBackCategory: Category): void {

        if (aFallBackCategory || aCategory) {
            if (aFallBackCategory.hash == aCategory.hash) {
                return;
            }
        } 

        if (aCategory.name == this.defaultCategory.name) {
            LogUtil.error(this, 'Category are not allowed to delete!');
            return;
        }

        this.categoryRestService
            .deleteCategory(this.appService.getCurrentUser(),aCategory,aFallBackCategory).subscribe(
                data => this.messageService.publish(new CategoryDeletedMessage(aCategory, aFallBackCategory))
            );
    }

}