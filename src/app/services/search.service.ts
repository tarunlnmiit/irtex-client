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
  private baseUrl = environment.backEndUrl;
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(imageId: string): Observable<QueryImage> {
    const searchUrl = `${this.baseUrl}/image/${imageId}`;
    return this.httpClient.get<QueryImage>(searchUrl);
  }

  getSearchResults(imageId: string): Observable<ResultResponse> {
    const searchUrl = `${this.baseUrl}/result/${imageId}`;
    return this.httpClient.get<ResultResponse>(searchUrl);
  }
}
