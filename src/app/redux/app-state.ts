import { CityModel } from './../models/city.model';
import { ProductModel } from './../models/product.model';
import { CartItemModel } from "../models/cart-item.model";
import { UserModel } from "./../models/user.model";
import { CartModel } from "./../models/cart.model";
import { InviteModel } from "./../models/invite.model";
import { CategoryModel } from '../models/category.model';
import { CookieService } from 'ngx-cookie-service';

export class AppState {
    
    //data from DB for site
    public products: ProductModel[]; //all the products
    public categories: CategoryModel[]; //all the categories
    public cities: CityModel[]; //cities for form register user
    public numOfInvites: number; //amount of invites from all users
    public numOfProducts: number; //amount of all the products in the store


    //data of the user
    public user: UserModel; //user details load from cookie
    public cartItems: CartItemModel[]; //user's open cart items
    public cartsOfUser: CartModel[]; //all the carts of the user
    public invitesOfUser: InviteModel[]; //all the invites of the user
    public lastInvite: InviteModel; //last invite of the user
    public openCart: CartModel; //the open cart of the user
    public cartTotalPrice: number; //total price of the user's open cart
    public cartNumberOfItems: number; //amount of products types in the user's open cart
    public selectedProduct: ProductModel; //the product that the user selected for adding to cart

    //flags
    public isAdmin: number; //if user is admin
    // public noCarts: boolean; //if no carts for user
    public IsCartEmpty: boolean; //if the user's cart is empty
    public orderCompleted: boolean; //if order completed right now
    public isLoggedIn: boolean; //if user is logged in right now

    //data from user
    public newUser: UserModel; // user object for register form

    //functions
    public MenuOpen: boolean; //status of open the menu
    
    
    public constructor() {

        this.newUser=new UserModel();
        this.newUser.isAdmin=0;
        this.cartNumberOfItems=0;
        this.cartTotalPrice=0;
        this.orderCompleted=false;
        this.MenuOpen=true;


        this.user=getUserFromCookie();
        this.isLoggedIn=this.user? true : false;
        this.isAdmin=this.user?.isAdmin? 1 : 0;
    }




    
}

function getUserFromCookie() :UserModel{
    let user: UserModel;
    const allCookies = document.cookie.split("; "); // ["cv=my-cv.pdf", "color=green", "language=he"]
    console.log(allCookies); 

    for (const oneCookie of allCookies) { // oneCookie = "cv=my-cv.pdf"
      const pairArr = oneCookie.split("="); // ["cv", "my-cv.pdf"]
      if (pairArr[0] === "user1") {
        user = JSON.parse(pairArr[1]);
      }
    }

    console.log("redux getUserFromCookie:");
    console.log(user);
    return user;
}

// export { AppState };