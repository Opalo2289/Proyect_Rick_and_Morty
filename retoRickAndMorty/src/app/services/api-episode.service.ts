import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/basedata.interface';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Filter } from '../interfaces/filters.interface';
import { BASE_CHARACTER_API_URL, BASE_EPISODE_API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiEpisodeService {

  constructor(private http: HttpClient) { }

  getData(prev: string, name: string, pages: number, currentPage: number): Observable<ApiResponse<Episode>> {

    let params = new HttpParams();

    return this.http.get<ApiResponse<Episode>>(BASE_EPISODE_API_URL, { params });
  }
}