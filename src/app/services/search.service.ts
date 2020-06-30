import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../common/searchResult';
import { HttpClient } from '@angular/common/http';
import { QueryImage } from '../common/queryImage';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResultResponse } from '../common/resultResponse';
import { Settings } from '../common/settings';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = Settings.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getQueryImageDetails(imageId: string): Observable<QueryImage> {
    const searchUrl = `${this.baseUrl}/image?query_url=${imageId}`;
    return this.httpClient.get<QueryImage>(searchUrl);
  }

  getQuerySet(dataset: string, sessionId: string): Observable<QueryImage[]> {
    const url = `${this.baseUrl}/result/queries?session_id=${sessionId}&dataset=${dataset}`;
    return this.httpClient.get<QueryImage[]>(url);
  }

  getSearchResults(
    imageId: string,
    dataset: string,
    isUrlSearch: boolean,
    sessionId: string
  ): Observable<ResultResponse> {
    console.log(dataset);
    let searchUrl = `${this.baseUrl}/result/${imageId}?dataset=${dataset}`;
    if (isUrlSearch) {
      searchUrl = `${this.baseUrl}/result/url?query_url=${imageId}&dataset=${dataset}&session_id=${sessionId}`;
    }
    return this.httpClient.get<ResultResponse>(searchUrl);
  }

  getSearchGlobalExplanation(imageId, dataset, sessionId) {
    let expplainationUrl = `${this.baseUrl}/result/explain/global?dataset=${dataset}&query_url=${imageId}&session_id=${sessionId}`;

    return this.httpClient.get<any>(expplainationUrl);
  }

  sendCompareClicks(imageId, dataset, sessionId, selectedImages) {
    let expplainationUrl = `${this.baseUrl}/result/compare?dataset=${dataset}&query_url=${imageId}&session_id=${sessionId}&selected_images=${selectedImages}`;
    return this.httpClient.get<any>(expplainationUrl);
  }
}
