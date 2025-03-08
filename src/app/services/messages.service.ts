import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Message {
  id: string;
  name: string;
  phone: string;
  msg: string;
  createdAt: string
}

export interface MessageListResponse {
  messages: Message[];
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

export class MessagesService {

  private apiUrl = 'http://localhost:3000/api/v1/messages';
  
  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<ApiResponse<MessageListResponse>> {
      return this.http.get<ApiResponse<MessageListResponse>>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }
  
  createMessage(message: FormData): Observable<ApiResponse<Message>> {
    return this.http.post<ApiResponse<Message>>(this.apiUrl, message).pipe(
      catchError(this.handleError)
    );
  }

  deleteMessage(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Server error';
    return throwError(() => new Error(errorMessage));
  }
}
