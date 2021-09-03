import { ImageService } from './../../services/image.service';
import { store } from '../../redux/store';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryModel } from 'src/app/models/category.model';
import { Unsubscribe } from 'redux';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddComponent implements OnInit {

  private unsubscribe: Unsubscribe;
  public productToAdd= new ProductModel();
  public categories: CategoryModel[];
  public selectedFile: File = null;

  constructor(
    private myProductService: ProductService,
    private myImageUploadService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.categories = store.getState().categories;

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.categories = store.getState().categories;
    });
  }

  //when admin choose a file
  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  //add product to DB
  public async addAsync(){
    try{
      const addedImage = await this.myImageUploadService.uploadImageAsync(this.selectedFile);
      this.productToAdd.image=addedImage.name;
      const addedProduct=await this.myProductService.addProductAsync(this.productToAdd);
      store.dispatch({ type: ActionType.addNewProduct, payload: addedProduct });
      this.router.navigateByUrl("/admin/edit/chooseProduct");
    }

    catch(err){
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }

}
