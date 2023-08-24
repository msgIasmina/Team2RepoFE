import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Campaign} from "../models/campaign";
import {CampaignFilterPair} from "../models/CampaignFilterPair";
import {DonationFilterPair} from "../../donations/models/DonationFilterPair";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  url:string = "http://localhost:8080/campaigns";

  campaignFilterPair$: BehaviorSubject<CampaignFilterPair> =
    new BehaviorSubject<CampaignFilterPair>(new CampaignFilterPair([],0));
  loadCampaigns(params: any): Observable<CampaignFilterPair> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }

    const fullUrl = this.url + '/filter' + '?' + this.serializeQueryParams(params);

    return this.http.get<CampaignFilterPair>(fullUrl, header).pipe(
      tap(campaignFilterPair => this.campaignFilterPair$.next(campaignFilterPair))
    );
  }

  private serializeQueryParams(params: any): string {
    return Object.keys(params)
      .map(key => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          // Convert numbers to strings, and escape values
          const serializedValue = typeof value === 'number' ? value.toString() : encodeURIComponent(value);
          return `${key}=${serializedValue}`;
        }
        return ''; // Skip null or undefined values
      })
      .filter(param => param !== '') // Remove empty values
      .join('&');
  }

  getCampaignFilterPair(): Observable<CampaignFilterPair> {
    return this.campaignFilterPair$.asObservable();
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

  findCampaignById(id:number){
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<Campaign>(`${this.url}/${id}`,header);
  }

  deleteCampaignById(id:number|undefined){
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.delete<void>(`${this.url}/${id}`,header)
  }

}
