
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
import { LogUtil } from "../utils/log-util";
import { CategoriesModifiedMessage } from "../services/categories-modified-message";

@Component({
    selector: 'category-component',
    templateUrl: './category.component.html'
})
export class CategoryComponent {

    @ViewChild(ComponentDirective) componentDirective: ComponentDirective;

    private name: string;

    private categories: Array<Category>;

    private categoryUpdatedSubscription: Subscription;

    constructor(
            private categoryService: CategoryService,
            private componentFactoryResolver: ComponentFactoryResolver,
            private messageService: MessagingService) {
        
        LogUtil.info(this,"Init CategoryComponent");

        this.categoryUpdatedSubscription = messageService
            .of(CategoriesModifiedMessage)
            .subscribe(this.updateCategories.bind(this));

        LogUtil.logMessages(this,"Registered CategoryUpdateMessage");

        this.categories = categoryService.getCategories();
        this.name = "";
    }

    private addNewCategory() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddCategoryComponent);

        let viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
    }

    private deleteCategory(aCategory: Category): void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DeleteCategoryComponent);

        let viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<DeleteCategoryComponent>componentRef.instance).category = aCategory;
    }

    private editCategory(aCategory: Category): void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditCategoryComponent);

        let viewContainerRef = this.componentDirective.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<EditCategoryComponent>componentRef.instance).category = aCategory;
    }

    private updateCategories() {
        LogUtil.info(this,'Update categories');
        this.categories = this.categoryService.getCategories();
    }

    ngOnDestroy() {
        this.categoryUpdatedSubscription.unsubscribe();
    }



}