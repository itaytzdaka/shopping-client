import { StoreService } from './store.service';
import { CookieService } from 'ngx-cookie-service';
import { store } from './../redux/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
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
    if (this.myStoreService.isAdmin()) {
      this.router.navigateByUrl(redirectAdmin);
      return "is admin";
    }

    //regular user logged in
    this.router.navigateByUrl(redirectUser);
    return "is logged in";


  }


  public async disconnectAsync(): Promise<void> {

      try {
        await this.http.post("http://localhost:3000/api/users/logout", {}).toPromise();

        this.cookieService.deleteAll('/');
        this.myStoreService.disconnectUser();
        this.router.navigateByUrl("/home/login");

      }
      catch (err) {
        console.log(err);
      }


  }
}
