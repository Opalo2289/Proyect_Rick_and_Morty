import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'https://rickandmortyapi.com/api/character/';
  


  constructor(private http: HttpClient) { }

   public getData(page: number, filters: any): Observable<any> {
    let urlGetApi = this.urlApi;

    let params = new HttpParams()
    if (page != 1){
      params = params.set('page', page)
    }

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    urlGetApi += '?' + params.toString();

    return this.http.get<any>(urlGetApi);
  }

  
}
