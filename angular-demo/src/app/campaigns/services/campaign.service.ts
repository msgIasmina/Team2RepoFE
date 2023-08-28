import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Campaign } from '../models/campaign';
import { CampaignFilterPair } from '../models/CampaignFilterPair';
import { Visualizer } from '../../util/visualizer.service';
import { TextResponse } from '../../models/text-response';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  url: string = 'http://localhost:8080/campaigns';
  campaignFilterPair$: BehaviorSubject<CampaignFilterPair> =
    new BehaviorSubject<CampaignFilterPair>(new CampaignFilterPair([], 0));

  constructor(
    private http: HttpClient,
    private visualizer: Visualizer,
  ) {}

  loadCampaigns(params: any): Observable<CampaignFilterPair> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };

    const fullUrl =
      this.url + '/filter' + '?' + this.visualizer.serializeQueryParams(params);

    return this.http
      .get<CampaignFilterPair>(fullUrl, header)
      .pipe(
        tap((campaignFilterPair) =>
          this.campaignFilterPair$.next(campaignFilterPair),
        ),
      );
  }

  getCampaignFilterPair(): Observable<CampaignFilterPair> {
    return this.campaignFilterPair$.asObservable();
  }

  getCampignsforUpdateAndAdd() {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.get<Campaign[]>(this.url + '?offset=0&pageSize=5', header);
  }

  downloadCsvFile(filterParams: any): Observable<Blob> {
    delete filterParams['pageSize'];
    delete filterParams['offset'];

    const headers = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') ?? '',
    );
    const fullUrl =
      this.url +
      '/export-csv' +
      '?' +
      this.visualizer.serializeQueryParams(filterParams);

    return this.http.get(fullUrl, { headers, responseType: 'blob' });
  }

  saveCampaign(newCampaign: Campaign): Observable<TextResponse> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.post<TextResponse>(this.url, newCampaign, header);
  }

  editCampaign(campaignToEdit: Campaign) {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.put<Campaign>(
      this.url + `/` + `${campaignToEdit.id}`,
      campaignToEdit,
      header,
    );
  }

  findCampaignById(id: number) {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.get<Campaign>(`${this.url}/${id}`, header);
  }

  deleteCampaignById(id: number | undefined) {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.delete<TextResponse>(`${this.url}/${id}`, header);
  }
}
