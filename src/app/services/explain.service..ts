import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExplainService {
  private baseUrl = 'http://localhost:8000/result';
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(parameters: string): Observable<any> {
    const searchUrl = `${this.baseUrl}/explain?${parameters}`;
    return this.httpClient.get<any>(searchUrl);
  }
}
