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

  getQueryImageDetails(parameters: string): Observable<any> {
    const searchUrl = `${this.baseUrl}/explain?${parameters}`;
    return this.httpClient.get<any>(searchUrl);
  }
}
