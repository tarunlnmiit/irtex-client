import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../common/searchResult';
import { HttpClient } from '@angular/common/http';
import { QueryImage } from '../common/queryImage';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResultResponse } from '../common/resultResponse';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // private baseUrl = 'https://irtex-engine.herokuapp.com';
  private baseUrl = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(imageId: string): Observable<QueryImage> {
    const searchUrl = `${this.baseUrl}/image/${imageId}`;
    return this.httpClient.get<QueryImage>(searchUrl);
  }

  getQuerySet(dataset: string, sessionId: string): Observable<QueryImage[]> {
    const url = `${this.baseUrl}/result/queries?session_id${sessionId}&dataset=${dataset}`;
    return this.httpClient.get<QueryImage[]>(url);
  }

  getSearchResults(
    imageId: string,
    dataset: string,
    isUrlSearch: boolean
  ): Observable<ResultResponse> {
    let searchUrl = `${this.baseUrl}/result/${imageId}?dataset=${dataset}`;
    if (isUrlSearch) {
      searchUrl = `${this.baseUrl}/result/url?query_url=${imageId}&dataset=${dataset}`;
    }
    return this.httpClient.get<ResultResponse>(searchUrl);
  }
}
