import { StoreService } from './store.service';
import { CookieService } from 'ngx-cookie-service';
import { store } from './../redux/store';
import { Router } from '@angular/router';
import { Injectable, VERSION } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { ActionType } from "src/app/redux/action-type";
// import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private myStoreService: StoreService,
    private cookieService: CookieService) { }



  public loginAsync(user: UserModel): Promise<any> {
    return this.http.post<UserModel>("http://localhost:3000/api/users/login", user).toPromise();
  }

  public registerAsync(user: UserModel): Promise<any> {
    return this.http.post<UserModel>("http://localhost:3000/api/users", user).toPromise();
  }

  public getAllEmailsAsync(): Promise<string[]> {
    return this.http.get<string[]>("http://localhost:3000/api/users/getAllEmails").toPromise();
  }


  public redirectUser(redirectUser: string, redirectAdmin: string): string {

    //not logged in
    if (!store.getState().isLoggedIn) {
      this.router.navigateByUrl("/home/login");
      return "not logged in";
    }

    //if is admin
    if (store.getState().user.isAdmin) {
      this.router.navigateByUrl(redirectAdmin);
      return "is admin";
    }

    //regular user logged in
    this.router.navigateByUrl(redirectUser);
    return "is logged in";


  }




  // public isLoggedIn(): Promise<UserModel> {

  //   return this.http.get<UserModel>("http://localhost:3000/api/users/isLoggedIn").toPromise();


  // }

  // public isAdmin(): boolean {
  //   if (sessionStorage.getItem("user") != null) {
  //     return JSON.parse(sessionStorage.getItem("user")).isAdmin;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  public disconnectAsync(): Promise<any> {

    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await this.http.post("http://localhost:3000/api/users/logout", {}).toPromise();

        this.cookieService.deleteAll('/');
        this.myStoreService.disconnectUser();
        this.router.navigateByUrl("/home/login");

        resolve(response);
      }
      catch (err) {
        reject(err);
      }
    });




    // return new Promise<any>(async (resolve, reject) => {
    //   try {
    //     const response = await axios.post("http://localhost:3000/api/users/views");
    //     resolve(response.data);
    //     console.log(response.data);

    //   }
    //   catch (err) {
    //     reject(err);
    //   }
    // });

    //   return new Promise<any>(async (resolve, reject) => {
    //   try {
    //     const response = await axios.post("http://localhost:3000/api/users/views");
    //     console.log(response.data);
    //     resolve(response.data);
    //   }
    //   catch (err) {
    //     reject(err);
    //   }
    // });

  }
}
