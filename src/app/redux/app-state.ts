import { CityModel } from './../models/city.model';
import { ProductModel } from './../models/product.model';
import { CartItemModel } from "../models/cart-item.model";
import { UserModel } from "./../models/user.model";
import { CartModel } from "./../models/cart.model";
import { InviteModel } from "./../models/invite.model";
import { CategoryModel } from '../models/category.model';
import { CookieService } from 'ngx-cookie-service';

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
    public isAdmin: number;
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

        this.newUser=new UserModel();
        this.newUser.isAdmin=0;
        
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