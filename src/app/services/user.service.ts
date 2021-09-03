import { store } from './../redux/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { ActionType } from "src/app/redux/action-type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  public loginAsync(user: UserModel): Promise<any> {
    return this.http.post<UserModel>("http://localhost:3000/api/users/login", user).toPromise();
  }

  public registerAsync(user: UserModel): Promise<any> {
    return this.http.post<UserModel>("http://localhost:3000/api/users", user).toPromise();
  }

  public getAllEmailsAsync(): Promise<string[]> {
    return this.http.get<string[]>("http://localhost:3000/api/users/getAllEmails").toPromise();
  }

  public isLoggedIn(): boolean {
    //if there is no token or user in the session
    if (!sessionStorage.getItem("token") || !sessionStorage.getItem("user")) {
      return false;
    }
    return true;
  }

  public isAdmin(): boolean{
    return JSON.parse(sessionStorage.getItem("user")).isAdmin;
  }

  public disconnect(): void{
    sessionStorage.clear();
    store.dispatch({ type: ActionType.disconnect});
    this.router.navigateByUrl("/home/login");
  }
}
