import { InviteModel } from './../models/invite.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  // public getAllDeliveryInvitesFromTodayAsync(): Promise<InviteModel[]> {
  //   return this.http.get<InviteModel[]>("http://localhost:3000/api/invites/deliveryFromToday").toPromise();
  // }

  public getAllInvitesOfUserAsync(user_id :string): Promise<InviteModel[]> {
    return this.http.get<InviteModel[]>("http://localhost:3000/api/invites/"+user_id).toPromise();
  }

  public addInviteAsync(inviteToAdd: InviteModel): Promise<InviteModel> {
    return this.http.post<InviteModel>("http://localhost:3000/api/invites", inviteToAdd).toPromise();
  }

  public getNumOfInvitesAsync(): Promise<number>{
    return this.http.get<number>("http://localhost:3000/api/invites/count").toPromise();
  }

}
