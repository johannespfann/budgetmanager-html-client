import { Injectable } from '@angular/core';
import { Category } from "../models/category";
import { LogUtil } from "../utils/log-util";
import { HashUtil } from "../utils/hash-util";



@Injectable()
export class CategoryService{

    private defaultCategory: Category;

    
    private categories: Array<Category>;


    constructor(){
        LogUtil.info(this,"Init CategoryService");

        let category: Category = Category.create("Allgmein");
        category = category.setId(HashUtil.getUniqueHash(category.getName()));
        this.defaultCategory = category;
        this.categories = this.initTestDate();   
    }

    public update(oldCategory:Category, updatedCategory:Category): void {
        LogUtil.info(this,'Update Category');

        for(var index in this.categories){
            
            if(this.categories[index].getName() === oldCategory.getName()){
                this.categories[index] = updatedCategory;
            }
        }
    }

    public getDefaultCategory(): Category {
        LogUtil.info(this,"Return DefaultCategory: " + JSON.stringify(this.defaultCategory))
        return this.defaultCategory;
    }

    public getCategories(): Array<Category>{
         LogUtil.info(this,"CategoryService: getCategories");
        let categories: Category[] = new Array<Category>();
        categories = this.categories.slice();
        LogUtil.info(this,JSON.stringify(categories));
        return categories;
    }

    public addNewCategory(aCategory: Category):void {
        if(this.isAlreadyExists(aCategory.getName())){
            return; // TODO Throw error
        }
        this.categories.push(aCategory);
        LogUtil.info(this,"Added new Category: " + JSON.stringify(aCategory));
    }

    public delete(category:Category):void{
        if(category.getName() != this.defaultCategory.getName()){
            LogUtil.info(this,"Not implemented");
        }
    }

    private isAlreadyExists(aName: string){
        for(let category of this.categories){
            if(category.getName() === aName){
                return true;
            }
        }
        return false;
    }

    initTestDate(): Array<Category>{

        let category2: Category = Category.create("Haushalt");
        category2 = category2.setId(HashUtil.getUniqueHash(category2.getName()));

        let category3: Category = Category.create("Einnahmen");
        category3 = category3.setId(HashUtil.getUniqueHash(category3.getName()));

        let categories: Array<Category> = new Array<Category>();
        categories.push(this.defaultCategory);
        categories.push(category2);
        categories.push(category3);

        return categories;
    }



}