import { ImageService } from '../../../services/image.service';
import { store } from '../../../redux/store';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { Unsubscribe } from 'redux';
import { CategoryModel } from 'src/app/models/category.model';


@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditComponent implements OnInit {

  private unsubscribe: Unsubscribe;
  public productToEdit: ProductModel;
  public productId: string;
  public products: ProductModel[];
  public categories: CategoryModel[];
  public isListening: boolean = false;
  public selectedFile: File=null;

  constructor(
    private myProductService: ProductService,
    private myActivatedRoute: ActivatedRoute,
    private myImageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFromTheStore();
    this.listenToRoute();

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getFromTheStore();
      this.listenToRoute();
    });

  }

  // Take from the route the value of "id" parameter: 
  public listenToRoute(): void {
    if (!this.isListening && this.products) {
      this.myActivatedRoute.params.subscribe(routeParams => {
        this.isListening = true;
        if (routeParams._id !== "chooseProduct") {
          this.productToEdit = this.products.find(p => p._id === routeParams._id);
        }
        else {
          this.productToEdit = undefined;
        }
      });
    }
  }

  //get data from the store
  public getFromTheStore(): void {
    this.products = store.getState().products;
    this.categories = store.getState().categories;
  }

  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  //save product in the DB
  public async saveAsync() {
    try {
      //if file selected
      if (this.selectedFile) {
        //delete the old image from the server
        this.myImageService.deleteImageAsync(this.productToEdit.image);
        const addedImage = await this.myImageService.uploadImageAsync(this.selectedFile);
        this.productToEdit.image = addedImage.name;
        this.selectedFile=null;
      }
      await this.myProductService.updateProductAsync(this.myActivatedRoute.snapshot.paramMap.get("_id"), this.productToEdit)
      alert("המוצר נשמר");
      this.router.navigateByUrl("/admin/edit/chooseProduct");
    }
    catch (err) {
      console.log(err);
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }
}
