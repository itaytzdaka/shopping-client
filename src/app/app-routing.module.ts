import { OrderComponent } from './components/order/order.component';
import { AdminAddComponent } from './components/admin-add-product/admin-add-product.component';
import { AdminEditComponent } from './components/admin-edit-product/admin-edit-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Register1Component } from './components/register1/register1.component';
import { Register2Component } from './components/register2/register2.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ProductsComponent } from './components/products/products.component';
import {MatSidenavModule} from '@angular/material/sidenav';


const routes: Routes = [
  { path: "home", component: HomeComponent , children: [
    { path: "login", component: LoginComponent },
    { path: "register/1", component: Register1Component },
    { path: "register/2", component: Register2Component }
  ] },
  { path: "shopping", component: ShoppingComponent ,children: [
    { path: ":_id", component: ProductsComponent }
  ]},

  { path: "admin", component: AdminComponent , children: [
    { path: "edit/:_id", component: AdminEditComponent },
    { path: "add", component: AdminAddComponent }
  ]},
  
  // { path: "admin/edit/:_id", component: AdminEditComponent },
  // { path: "admin/add", component: AdminAddComponent },

  { path: "order", component: OrderComponent },
  { path: "", pathMatch: "full", redirectTo: "/home" } // Default Route. pathMatch: "full" --> "exact"

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
