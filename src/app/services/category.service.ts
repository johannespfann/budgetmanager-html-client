import { Injectable } from '@angular/core';
import { Category } from "../models/category";
import { LogUtil } from "../utils/log-util";
import { HashUtil } from "../utils/hash-util";
import { MessagingService } from "./message.service";
import { CategoryUpdatedMessage } from "./category-updated-message";
import { CategoryAddedMessage } from "./category-added-message";
import { CategoryDeletedMessage } from "./category-deleted-message";



@Injectable()
export class CategoryService {

    private defaultCategory: Category;

    private categories: Array<Category>;

    constructor(
        private messageService: MessagingService
    ) {
        LogUtil.info(this, "Init CategoryService");

        let category: Category = Category.create("Allgmein");
        this.defaultCategory = category;
        this.categories = this.initTestDate();
    }

    public update(aCategory: Category): void {

        for (var index in this.categories) {
            if (this.categories[index].getId() === aCategory.getId()) {
                this.categories[index] = aCategory;
            }
        }

        this.messageService.publish(new CategoryUpdatedMessage(Category.copy(aCategory)));

        LogUtil.debug(this, 'Update Category');
    }

    public getDefaultCategory(): Category {
        LogUtil.debug(this, "Return DefaultCategory: " + JSON.stringify(this.defaultCategory))
        return Category.copy(this.defaultCategory);
    }

    public getCategories(): Array<Category> {
        let newCategories: Array<Category> = new Array<Category>();
        for (let category of this.categories) {
            newCategories.push(Category.copy(category));
        }

        LogUtil.debug('Return categories: ' + this, JSON.stringify(newCategories));

        return newCategories;
    }

    public addNewCategory(aCategory: Category): void {
        if (this.isAlreadyExists(aCategory.getName())) {
            // TODO handle error in front-end
            LogUtil.error(this, 'Category already exists: ' + aCategory.getName());
            return;
        }
        this.categories.push(aCategory);

        this.messageService.publish(new CategoryAddedMessage(Category.copy(aCategory)));

        LogUtil.debug(this, "Added new Category: " + JSON.stringify(aCategory));
    }

    public delete(aCategory: Category, aFallBackCategory: Category): void {

        if (aFallBackCategory || aCategory) {
            if (aFallBackCategory.getId() == aCategory.getId()) {
                return;
            }
        }

        if (aCategory.getName() == this.defaultCategory.getName()) {
            LogUtil.error(this, 'Category are not allowed to delete!');
            return;
        }

        this.categories.filter(category => {
            if (aCategory.getId() == category.getId()) {
                let index = this.categories.findIndex(cat => cat.getId() == category.getId());
                this.categories.splice(index, 1);
            }
        });

        this.messageService.publish(new CategoryDeletedMessage(aCategory, aFallBackCategory));
    }

    private isAlreadyExists(aName: string) {
        for (let category of this.categories) {
            if (category.getName() === aName) {
                return true;
            }
        }
        return false;
    }

    private initTestDate(): Array<Category> {

        let category2: Category = Category.create("Haushalt");
        let category3: Category = Category.create("Einnahmen");

        let categories: Array<Category> = new Array<Category>();
        categories.push(this.defaultCategory);
        categories.push(category2);
        categories.push(category3);

        return categories;
    }
}