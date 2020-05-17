import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../common/SearchResult';
import { HttpClient } from '@angular/common/http';
import { QueryImage } from '../common/queryImage';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  //TODO : read from .env
  private baseUrl = 'http://localhost:8000/upload';
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(imageId: string): Observable<QueryImage> {
    const searchUrl = `${this.baseUrl}/fetch_image/${imageId}`;
    return this.httpClient.get<QueryImage>(searchUrl);
  }

  getSearchResults(imageId: string): Observable<SearchResult[]> {
    const searchUrl = `${this.baseUrl}/fetch_results/${imageId}`;
    return this.httpClient.get<SearchResult[]>(searchUrl);
  }
}
