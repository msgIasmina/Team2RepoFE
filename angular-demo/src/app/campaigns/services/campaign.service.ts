import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Campaign} from "../models/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  url:string = "http://localhost:8080/campaigns";

  campaignList$: BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);

  loadCampaigns(): Observable<Campaign[]> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<Campaign[]>(this.url, header).pipe(
      tap(campaign => this.campaignList$.next(campaign))
    );
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.campaignList$.asObservable();
  }

  saveCampaign(newCampaign:Campaign):Observable<Campaign>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.post<Campaign>(this.url,newCampaign,header)
  }

  editCampaign(campaignToEdit:Campaign){
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.put<Campaign>(this.url + `/` + `${campaignToEdit.id}`, campaignToEdit, header);
  }

}
