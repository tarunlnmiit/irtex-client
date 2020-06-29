import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../common/settings';

@Injectable({
  providedIn: 'root',
})
export class ExplainService {
  private baseUrl = Settings.baseUrl + '/result';
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(feature: string, parameters: string): Observable<any> {
    const searchUrl = `${this.baseUrl}/explain/${feature}?${parameters}`;
    return this.httpClient.get<any>(searchUrl);
  }
}
