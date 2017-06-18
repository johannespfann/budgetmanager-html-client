
import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";
import { ComponentDirective } from "./component.directive";
import { AddCategoryComponent } from "./add-category.component";
import { DeleteCategoryComponent } from "./delete-category.component";
import { EditCategoryComponent } from "./edit-category.component";
import { MessagingService } from "../services/message.service";
import { CategoryUpdatedMessage } from "../services/category-updated-message";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector : 'category-component',
    templateUrl : './category.component.html'
})
export class CategoryComponent{

    @ViewChild(ComponentDirective) componentDirective: ComponentDirective;

    private name: string;

    private categories: Category[];

    private categoryUpdatedSubscription: Subscription;
    
    constructor(
            private categoryService:CategoryService, 
            private componentFactoryResolver: ComponentFactoryResolver,
            private messageService: MessagingService){
        console.log("Init CategoryComponent");

        this.categoryUpdatedSubscription = messageService
            .of(CategoryUpdatedMessage)
            .subscribe(this.updateCategories.bind(this));

        console.log("Registered CategoryUpdateMessage");

        this.categories = categoryService.getCategories();  
        this.name = ""; 
    }

    private addNewCategory(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddCategoryComponent);

        let viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        console.log("Add new Category");
     
    }

    private deleteCategory(aCategory:Category): void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DeleteCategoryComponent);

        let viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        console.log("delete Category");
    }

    private editCategory(aCategory:Category): void{
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditCategoryComponent);

        let viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<EditCategoryComponent>componentRef.instance).category = aCategory;
        console.log("pressed editCategory");
    }

    private updateCategories(){
        console.log("update new categories");
        this.categories = this.categoryService.getCategories();
    }

    ngOnDestroy() {
    this.categoryUpdatedSubscription.unsubscribe();    
    }



}