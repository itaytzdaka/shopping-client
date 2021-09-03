import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MultiStepRegisterComponent } from './components/multi-step-register/multi-step-register.component';
// import { FormatTitlePipe } from './pipes/format-title.pipe';
import { Register1Component } from './components/register1/register1.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminEditComponent } from './components/admin-edit-product/admin-edit-product.component';
import { AdminAddComponent } from './components/admin-add-product/admin-add-product.component';
import { OrderComponent } from './components/order/order.component';
import { AddInviteComponent } from './components/add-invite/add-invite.component';
import { FinalCartComponent } from './components/final-cart/final-cart.component';
import { Register2Component } from './components/register2/register2.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MarkSearchPipe } from './pipes/mark-search.pipe';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { AddItemDialogComponent } from './components/add-item-dialog/add-item-dialog.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    LoginComponent,
    // MultiStepRegisterComponent,
    // FormatTitlePipe,
    Register1Component,
    Register2Component,
    ProductsComponent,
    CartComponent,
    ShoppingComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminEditComponent,
    AdminAddComponent,
    OrderComponent,
    AddInviteComponent,
    FinalCartComponent,
    MarkSearchPipe,
    AddItemDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
