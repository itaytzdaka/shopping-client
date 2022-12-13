import { OrderComponent } from './pages/order/order.component';
import { AdminAddComponent } from './pages/admin/admin-add-product/admin-add-product.component';
import { AdminEditComponent } from './pages/admin/admin-edit-product/admin-edit-product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/menu/login/login.component';
import { Register1Component } from './pages/home/menu/register1/register1.component';
import { Register2Component } from './pages/home/menu/register2/register2.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { ProductsComponent } from './pages/shopping/products/products.component';
import {MatSidenavModule} from '@angular/material/sidenav';


const routes: Routes = [
  { path: "home", component: HomeComponent , children: [
    { path: "login", component: LoginComponent },
    { path: "register/1", component: Register1Component },
    { path: "register/2", component: Register2Component }] 
  },
  { path: "shopping", component: ShoppingComponent ,children: [
    { path: ":_id", component: ProductsComponent }]
  },
  { path: "admin", component: AdminComponent , children: [
    { path: "edit/:_id", component: AdminEditComponent },
    { path: "add", component: AdminAddComponent }
  ]},
  { path: "order", component: OrderComponent },
  { path: "", pathMatch: "full", redirectTo: "/home" } // Default Route. pathMatch: "full" --> "exact"

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
