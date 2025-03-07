import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  selling_price: number;
  market_price: number;
  stock: string;
  image?: {
    type: string;
    data: number[];
  };
  updatedAt: string
}

export interface ProductListResponse {
  products: Product[];
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
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/v1/products';
  
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse<ProductListResponse>> {
    return this.http.get<ApiResponse<ProductListResponse>>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(product: FormData): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, product).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: string, product: FormData): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Server error';
    return throwError(() => new Error(errorMessage));
  }
}
