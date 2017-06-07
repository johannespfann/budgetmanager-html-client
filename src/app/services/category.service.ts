import { Injectable } from '@angular/core';
import { Category } from "../models/category";



@Injectable()
export class CategoryService{

    private defaultCategory: Category;

    lastId: number;
    categories: Array<Category>;


    constructor(){
        console.log("Init CategoryService");

        let category: Category = new Category();
        category.id = 1;
        category.name = "Allgemein";

        this.defaultCategory = category;

        this.categories = this.initTestDate();
        this.lastId = this.categories.length;       
    }

    public getDefaultCategory(): Category{
        console.log("Return DefaultCategory: " + JSON.stringify(this.defaultCategory))
        return this.defaultCategory.copy();
    }

    public getCategories(): Array<Category>{
        return this.categories
    }

    public addNewCategory(aName: string):void {
        console.log(aName);
        if(this.isAlreadyExists(aName)){
            return; // TODO Throw error
        }
        console.log(aName);
        let category: Category = new Category();
        
        category.id = this.generateNewId();
        category.name = aName;
        console.log(aName);
        this.categories.push(category);
        console.log("Added new Category: " + JSON.stringify(category));
    }

    public delete(category:Category):void{
        if(category.name != 'Allgemein'){
            
        }
    }

    private generateNewId(): number{
        this.lastId = this.lastId + 1;
        return this.lastId;
    }

    private isAlreadyExists(aName: string){
        for(let category of this.categories){
            if(category.name === aName){
                return true;
            }
        }
        return false;
    }

    initTestDate(): Array<Category>{

        let category2: Category = new Category();
        category2.id = 2;
        category2.name = "Haushalt";

        let category3: Category = new Category();
        category3.id = 3;
        category3.name = "Einnahmen";

        let categories: Array<Category> = new Array<Category>();
        categories.push(this.defaultCategory.copy());
        categories.push(category2.copy());
        categories.push(category3.copy());

        return categories;
    }



}