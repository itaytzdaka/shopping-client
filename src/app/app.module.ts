import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {HttpRequestInterceptor} from './services/html-req-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './pages/home/menu/menu.component';
import { MainComponent } from './pages/home/main/main.component';
import { LoginComponent } from './pages/home/menu/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MultiStepRegisterComponent } from './components/multi-step-register/multi-step-register.component';
// import { FormatTitlePipe } from './pipes/format-title.pipe';
import { Register1Component } from './pages/home/menu/register1/register1.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductsComponent } from './pages/shopping/products/products.component';
import { CartComponent } from './pages/shopping/cart/cart.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminEditComponent } from './pages/admin/admin-edit-product/admin-edit-product.component';
import { AdminAddComponent } from './pages/admin/admin-add-product/admin-add-product.component';
import { OrderComponent } from './pages/order/order.component';
import { AddInviteComponent } from './pages/order/add-invite/add-invite.component';
import { FinalCartComponent } from './pages/order/final-cart/final-cart.component';
import { Register2Component } from './pages/home/menu/register2/register2.component';

import { CookieService } from 'ngx-cookie-service';


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
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';


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
    AddItemDialogComponent,
    WelcomeComponent,
    HeaderComponent,
    CategoriesComponent
    
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
  providers: [CookieService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
