import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
export class AuthService {

  private apiUrl: string;
  http = inject(HttpClient);
  
  constructor(@Inject('APP_CONFIG') private config: any) {
    this.apiUrl = `${this.config.apiEndpoint}/auth`;
  }

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(data: FormData): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/changePassword`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const errorSetting = error?.error?.message || 'Server error';
    return throwError(() => new Error(errorSetting));
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getTokenExpiration(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const expiration = this.getTokenExpiration(token);
    if (!expiration || Date.now() > expiration) {
      this.logout();
      return false;
    }
    return true;
  }

}
