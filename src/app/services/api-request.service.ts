import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpClient,
  HttpEvent,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  //TODO: Read from .env
  SERVER_URL: string = 'http://127.0.0.1:8000/upload/';
  // SERVER_URL: string = 'https://irtex-engine.herokuapp.com/userdata/';
  constructor(private httpClient: HttpClient) {}

  public upload(data, url_path) {
    let uploadURL = this.SERVER_URL + url_path;

    return this.httpClient
      .post<any>(uploadURL, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
}
