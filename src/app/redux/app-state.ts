import { CityModel } from './../models/city.model';
import { ProductModel } from './../models/product.model';
import { CartItemModel } from "../models/cart-item.model";
import { UserModel } from "./../models/user.model";
import { CartModel } from "./../models/cart.model";
import { InviteModel } from "./../models/invite.model";
import { CategoryModel } from '../models/category.model';

export class AppState {
    
    //data from DB
    public user: UserModel;
    public products: ProductModel[];
    public carts: CartModel[];
    public invites: InviteModel[];
    public cartItems: CartItemModel[];
    public categories: CategoryModel[];
    public cities: CityModel[];
    public numOfInvites: number;
    public numOfProducts: number;
    
    //calculated based of the data from DB
    public isLoggedIn: boolean;
    public openCart: CartModel;
    public lastInvite: InviteModel;
    public isNewUser: boolean;
    public cartNumberOfItems: number;
    public cartTotalPrice: number;
    public IsCartEmpty: boolean;
    public selectedProduct: ProductModel;

    //data from user
    public newUser: UserModel;

    //functions
    public MenuOpen: boolean;

    
    public constructor() {
        const json = sessionStorage.getItem("user");
        if (json) {
            this.user = JSON.parse(json);
        }

        if (!sessionStorage.getItem("token") || !sessionStorage.getItem("user")) {
      
            this.isLoggedIn=false;
          }
        else{
            this.isLoggedIn=true;
        }

        this.newUser=new UserModel();
        this.newUser.isAdmin=0;
        
        this.MenuOpen=true;
    }
}