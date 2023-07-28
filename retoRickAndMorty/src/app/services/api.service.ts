import { Observable } from 'rxjs';
import { BaseData } from '../interfaces/basedata.interface';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { Filter } from '../interfaces/filters.interface';



export interface ApiService<T extends BaseData> {
  getData(page: number, filters: Filter): Observable<ApiResponse<T>>;
}