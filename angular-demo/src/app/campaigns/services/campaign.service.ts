import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../models/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  url:string = "http://localhost:8080/campaigns";

  saveCampaign(newCampaign:Campaign):Observable<Campaign>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.post<Campaign>(this.url,newCampaign,header)
  }

}
