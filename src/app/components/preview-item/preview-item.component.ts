import { store } from '../../redux/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss']
})
export class PreviewItemComponent implements OnInit {

  public selectedProduct: ProductModel;
  
  constructor(
    public dialogRef: MatDialogRef<PreviewItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.selectedProduct=store.getState().selectedProduct;
  }


}
