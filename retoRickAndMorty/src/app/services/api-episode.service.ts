import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Episode } from '../interfaces/basedata.interface';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Filter } from '../interfaces/filters.interface';
import { BASE_EPISODE_API_URL } from '../constants/constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})


export class ApiEpisodeService implements ApiService<Episode>{

  constructor(private http: HttpClient) { }

  getData(page: number, filters: Filter): Observable<ApiResponse<Episode>> {

    let params = new HttpParams();

    if (page !== 1) {
      params = params.set('page', page.toString());
    }

    return this.http.get<ApiResponse<Episode>>(BASE_EPISODE_API_URL, { params }).pipe(
      catchError((error) => {
        // Aquí puedes realizar acciones específicas para manejar el error, por ejemplo, mostrar un mensaje de error o realizar alguna otra acción
        console.error('Error en la petición:', error);
        // Retorna un Observable vacío o un valor predeterminado en caso de error
        return throwError(() => new Error('Ocurrió un error en la solicitud'));
      })
    );;
  }
}