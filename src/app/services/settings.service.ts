import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Setting {
  id: string;
  logo_name: string;
  email?: string;
  place?: string;
  fb?: string;
  twitter?: string;
  linked_in?: string;
  insta?: string;
  location: string;
  contact_phone: string;
  contact_email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingResponse {
  settings: Setting;
  totalCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  dateTime: string;
}

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private apiUrl = 'http://localhost:3000/api/v1/settings';
  
  constructor(private http: HttpClient) {}

  getSettings(): Observable<ApiResponse<SettingResponse>> {
      return this.http.get<ApiResponse<SettingResponse>>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }
  
  updateSetting(id: string, setting: Partial<Setting>): Observable<ApiResponse<Setting>> {
    return this.http.patch<ApiResponse<Setting>>(`${this.apiUrl}/${id}`, setting).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const errorSetting = error?.error?.message || 'Server error';
    return throwError(() => new Error(errorSetting));
  }
}
