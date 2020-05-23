import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../common/searchResult';
import { HttpClient } from '@angular/common/http';
import { QueryImage } from '../common/queryImage';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = 'https://irtex-engine.herokuapp.com';
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(imageId: string): Observable<QueryImage> {
    const searchUrl = `${this.baseUrl}/image/${imageId}`;
    return this.httpClient.get<QueryImage>(searchUrl);
  }

  getSearchResults(imageId: string): Observable<SearchResult[]> {
    const searchUrl = `${this.baseUrl}/result/${imageId}`;
    return this.httpClient
      .get<ApiResponse>(searchUrl)
      .pipe(map((response) => response.result));
  }
}

interface ApiResponse {
  result: SearchResult[];
}
