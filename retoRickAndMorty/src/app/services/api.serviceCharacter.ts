import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Character } from '../interfaces/basedata.interface';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Filter } from '../interfaces/filters.interface';
import { BASE_CHARACTER_API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceCharacter implements ApiService<Character> {

  constructor(private http: HttpClient) {}

  public getData(page: number, filters: Filter): Observable<ApiResponse<Character>> {
    
    let params = new HttpParams();

    if (page !== 1) {
      params = params.set('page', page.toString());
    }

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<ApiResponse<Character>>(BASE_CHARACTER_API_URL, { params });
  }
}
