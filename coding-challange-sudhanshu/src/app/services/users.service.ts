import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public endpoint = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
   }

   private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  fetchUsers(): Observable<any> {
    return this.http.get(this.endpoint + '/users').pipe(
      map(this.extractData));
    }

    fetchAlbums(): Observable<any> {
      return this.http.get(this.endpoint + '/albums').pipe(
        map(this.extractData));
      }

  fetchImages(): Observable<any> {
  return this.http.get(this.endpoint + '/photos').pipe(
    map(this.extractData));
  }

}
