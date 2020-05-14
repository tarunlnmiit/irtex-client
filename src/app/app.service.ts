import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const localUrl = 'https://irtex-engine.herokuapp.com/userdata/';
// const localUrl = 'assets/data/smartphone.json';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  getUserData() {
    return this.http.get(localUrl);
  }
}
