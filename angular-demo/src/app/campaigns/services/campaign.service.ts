import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Campaign} from "../models/campaign";
import {CampaignFilterPair} from "../models/CampaignFilterPair";
import {DonationFilterPair} from "../../donations/models/DonationFilterPair";
import {Visualizer} from "../../util/visualizer.service";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient,
              private visualizer: Visualizer) { }

  url:string = "http://localhost:8080/campaigns";

  campaignFilterPair$: BehaviorSubject<CampaignFilterPair> =
    new BehaviorSubject<CampaignFilterPair>(new CampaignFilterPair([],0));
  loadCampaigns(params: any): Observable<CampaignFilterPair> {
    const header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    };

    const fullUrl = this.url + '/filter' + '?' + this.visualizer.serializeQueryParams(params);

    return this.http.get<CampaignFilterPair>(fullUrl, header).pipe(
      tap(campaignFilterPair => this.campaignFilterPair$.next(campaignFilterPair))
    );
  }

  getCampaignFilterPair(): Observable<CampaignFilterPair> {
    return this.campaignFilterPair$.asObservable();
  }

  saveCampaign(newCampaign:Campaign):Observable<Campaign>{
    const header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    };
    return this.http.post<Campaign>(this.url,newCampaign,header)
  }

  editCampaign(campaignToEdit:Campaign){
    const header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    };
    return this.http.put<Campaign>(this.url + `/` + `${campaignToEdit.id}`, campaignToEdit, header);
  }

  findCampaignById(id:number){
    const header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    };
    return this.http.get<Campaign>(`${this.url}/${id}`,header);
  }

  deleteCampaignById(id:number|undefined){
    const header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    };
    return this.http.delete<void>(`${this.url}/${id}`,header)
  }

}
