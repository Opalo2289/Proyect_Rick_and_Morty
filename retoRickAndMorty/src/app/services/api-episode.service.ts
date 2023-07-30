import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Episode } from '../interfaces/basedata.interface';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Filter } from '../interfaces/filters.interface';
import { BASE_EPISODE_API_URL } from '../constants/constants';
import { ApiService } from './api.service';
import { ApiError } from '../interfaces/api.error.interface';

@Injectable({
  providedIn: 'root'
})


export class ApiEpisodeService implements ApiService<Episode>{

  constructor(private http: HttpClient) { }

  getId(id: string): Observable<Episode> {
    const url = `${BASE_EPISODE_API_URL}/${id}`;

    return this.http.get<Episode>(url).pipe(
      catchError((error) => {
        // Aquí puedes manejar el error como prefieras, como mostrar un mensaje de error
        console.error('Error en la solicitud HTTP:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      }))
  }

  getData(page: number, filters: Filter): Observable<ApiResponse<Episode>> {
    const params = this.buildParams(page, filters);

    return this.http.get<ApiResponse<Episode>>(BASE_EPISODE_API_URL, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const apiError: ApiError = {
          message: 'Ocurrió un error en la solicitud.',
          status: error.status,
          statusText: error.statusText
        };

        // Aquí puedes realizar acciones específicas para manejar el error, por ejemplo, mostrar un mensaje de error o realizar alguna otra acción
        console.error('Error en la petición:', apiError);

        // Retorna un Observable de error en caso de error
        return new Observable<ApiResponse<Episode>>(observer => {
          observer.error(apiError);
          observer.complete();
        });
      })
    );
  }

  private buildParams(page: number, filters: Filter): HttpParams {
    let params = new HttpParams();

    if (page !== 1) {
      params = params.set('page', page.toString());
    }

    // Agregar más lógica para construir los parámetros según los filtros si es necesario

    return params;
  }
}