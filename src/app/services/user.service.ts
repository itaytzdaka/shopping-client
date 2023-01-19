import { StoreService } from './store.service';
import { CookieService } from 'ngx-cookie-service';
import { store } from './../redux/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { baseUrl } from 'src/environments/environment';

// import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
    ) { }



  public loginAsync(user: UserModel): Promise<any> {
    return this.http.post<UserModel>(baseUrl+ "/api/users/login", user).toPromise();
  }

  public registerAsync(user: UserModel): Promise<any> {
    return this.http.post<UserModel>(baseUrl+ "/api/users", user).toPromise();
  }

  public getAllEmailsAsync(): Promise<string[]> {
    return this.http.get<string[]>(baseUrl+ "/api/users/getAllEmails").toPromise();
  }

  public async disconnectUserAsync(): Promise<void> {
    return this.http.post<void>(baseUrl+ "/api/users/logout", {}).toPromise();
  }
}
