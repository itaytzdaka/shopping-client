import { InviteModel } from './../models/invite.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  // public getAllDeliveryInvitesFromTodayAsync(): Promise<InviteModel[]> {
  //   return this.http.get<InviteModel[]>(baseUrl+ "/api/invites/deliveryFromToday").toPromise();
  // }

  public getAllInvitesOfUserAsync(user_id :string): Promise<InviteModel[]> {
    return this.http.get<InviteModel[]>(baseUrl+ "/api/invites/"+user_id).toPromise();
  }

  public addInviteAsync(inviteToAdd: InviteModel): Promise<InviteModel> {
    return this.http.post<InviteModel>(baseUrl+ "/api/invites", inviteToAdd).toPromise();
  }

  public getNumOfInvitesAsync(): Promise<number>{
    return this.http.get<number>(baseUrl+ "/api/invites/count").toPromise();
  }

}
