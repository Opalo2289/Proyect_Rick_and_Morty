import { BaseData } from "./basedata.interface";

 
  export interface ApiResponse<T extends BaseData> {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: T[];
  }