import { InviteModel } from './../models/invite.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  public getAllDeliveryInvitesFromTodayAsync(): Promise<InviteModel[]> {
    return this.http.get<InviteModel[]>("http://localhost:3000/api/invites/deliveryFromToday").toPromise();
  }

  public getAllInvitesOfUserAsync(_id :string): Promise<InviteModel[]> {
    return this.http.get<InviteModel[]>("http://localhost:3000/api/invites/"+_id).toPromise();
  }

  public addInviteAsync(invite: InviteModel): Promise<InviteModel> {
    return this.http.post<InviteModel>("http://localhost:3000/api/invites", invite).toPromise();
  }

  public getNumOfInvitesAsync(): Promise<number>{
    return this.http.get<number>("http://localhost:3000/api/invites/count").toPromise();
  }

}
