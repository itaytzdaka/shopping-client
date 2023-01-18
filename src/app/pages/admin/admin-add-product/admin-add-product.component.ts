import { MainService } from './../../../services/main.service';
import { StoreService } from './../../../services/store.service';
import { ImageService } from '../../../services/image.service';
import { store } from '../../../redux/store';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryModel } from 'src/app/models/category.model';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddComponent implements OnInit, OnDestroy {

  private unsubscribe: Unsubscribe;
  public productToAdd = new ProductModel();
  public categories: CategoryModel[];
  public selectedFile: File = null;

  constructor(
    private myProductService: ProductService,
    private myImageUploadService: ImageService,
    private myStoreService: StoreService,
    private myCategoryService: CategoryService,
    private myMainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(!this.myStoreService.isAdmin())
      return;

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromTheStore();
    });

    this.getDataFromTheStore();
    this.getDataFromTheServer();

  }

  public getDataFromTheStore(): void{
    this.categories = store.getState().categories;
  }

  public getDataFromTheServer(): void{
    this.saveCategoriesInTheStoreAsync();
  }

  public async saveCategoriesInTheStoreAsync(): Promise<void> {
    try {
      if(!this.categories){
        const categories = await this.myCategoryService.getAllCategoriesAsync();
        this.myStoreService.saveCategories(categories);
      }
    }

    catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  //when admin choose a file
  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  //add product to DB
  public async addNewProductAsync(): Promise<void> {
    try {
      const addedImage = await this.myImageUploadService.uploadImageAsync(this.selectedFile);
      this.productToAdd.image = addedImage.name;
      const addedProduct = await this.myProductService.addProductAsync(this.productToAdd);
      this.myStoreService.addNewProduct(addedProduct);
      this.router.navigateByUrl("/admin/edit/chooseProduct");
    }

    catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
