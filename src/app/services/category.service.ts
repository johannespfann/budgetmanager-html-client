import { Injectable } from '@angular/core';
import { Category } from "../models/category";



@Injectable()
export class CategoryService{

    private defaultCategory: Category;

    lastId: number;
    categories: Array<Category>;


    constructor(){
        console.log("Init CategoryService");

        let category: Category = new Category("Allgmein");
        category = category.setId(1);

        this.defaultCategory = category;

        this.categories = this.initTestDate();
        this.lastId = this.categories.length;       
    }

    public update(aCategory:Category): void {
        
    }

    public getDefaultCategory(): Category {
        console.log("Return DefaultCategory: " + JSON.stringify(this.defaultCategory))
        return this.defaultCategory;
    }

    public getCategories(): Array<Category>{
        console.log("CategoryService: getCategories");
        let categories: Category[] = new Array<Category>();
        categories = this.categories.slice();
        return categories;
    }

    public addNewCategory(aName: string):void {
        if(this.isAlreadyExists(aName)){
            return; // TODO Throw error
        }
        let category: Category = new Category(aName);
        
        category = category.setId(this.generateNewId());
        this.categories.push(category);
        console.log("Added new Category: " + JSON.stringify(category));
    }

    public delete(category:Category):void{
        if(category.getName() != 'Allgemein'){
            
        }
    }

    private generateNewId(): number{
        this.lastId = this.lastId + 1;
        return this.lastId;
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

        let category2: Category = new Category("Haushalt");
        category2 = category2.setId(2);

        let category3: Category = new Category("Einnahmen");
        category3 = category3.setId(3);

        let categories: Array<Category> = new Array<Category>();
        categories.push(this.defaultCategory);
        categories.push(category2);
        categories.push(category3);

        return categories;
    }



}