import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpRequestInterceptor} from './services/html-req-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MarkSearchPipe } from './pipes/mark-search.pipe';
import { DecimalPipe } from './pipes/decimal.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';

import { CookieService } from 'ngx-cookie-service';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './pages/home/home-menu/home-menu.component';
import { MainComponent } from './pages/home/home-main/home-main.component';
import { LoginComponent } from './pages/home/home-menu/home-menu-login/home-menu-login.component';
import { Register1Component } from './pages/home/home-menu/home-menu-register1/home-menu-register1.component';
import { ShoppingMainComponent } from './pages/shopping/shopping-main/shopping-main.component';
import { CartComponent } from './pages/shopping/shopping-cart/shopping-cart.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin/admin-main/admin-main.component';
import { AdminEditComponent } from './pages/admin/admin-edit-product/admin-edit-product.component';
import { AdminAddComponent } from './pages/admin/admin-add-product/admin-add-product.component';
import { OrderComponent } from './pages/order/order.component';
import { AddInviteComponent } from './pages/order/order-main/order-main.component';
import { FinalCartComponent } from './pages/order/order-cart/order-cart.component';
import { AddItemDialogComponent } from './components/add-item-dialog/add-item-dialog.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { Register2Component } from './pages/home/home-menu/home-menu-register2/home-menu-register2.component';
import { ProductsComponent } from './components/products/products.component';
import { PreviewItemComponent } from './components/preview-item/preview-item.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AdminMenuComponent } from './pages/admin/admin-menu/admin-menu.component';
import { HomeMenuCartComponent } from './pages/home/home-menu/home-menu-cart/home-menu-cart.component';

@NgModule({
  declarations: [
    MarkSearchPipe,
    DecimalPipe,

    LayoutComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    LoginComponent,
    Register1Component,
    Register2Component,
    ShoppingMainComponent,
    CartComponent,
    ShoppingComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminEditComponent,
    AdminAddComponent,
    OrderComponent,
    AddInviteComponent,
    FinalCartComponent,
    AddItemDialogComponent,
    WelcomeComponent,
    HeaderComponent,
    CategoriesComponent,
    ProductsComponent,
    PreviewItemComponent,
    StatisticsComponent,
    AdminMenuComponent,
    HomeMenuCartComponent,
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
