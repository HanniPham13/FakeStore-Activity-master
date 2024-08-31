import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../product.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Get all products with optional URL parameter
  getProducts(url?: string): Observable<Product[]> {
    const requestUrl = url || this.apiUrl;
    return this.http.get<Product[]>(requestUrl).pipe(
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  // Get a single product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Product>('getProductById'))
    );
  }

  // Get products with a limit
  getLimitedProducts(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?limit=${limit}`).pipe(
      catchError(this.handleError<Product[]>('getLimitedProducts', []))
    );
  }

  // Get products sorted by a specific attribute
  getSortedProducts(sortBy: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?sort=${sortBy}`).pipe(
      catchError(this.handleError<Product[]>('getSortedProducts', []))
    );
  }

  // Get all categories (assuming API provides this endpoint)
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`).pipe(
      catchError(this.handleError<string[]>('getCategories', []))
    );
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`).pipe(
      catchError(this.handleError<Product[]>('getProductsByCategory', []))
    );
  }

  // Add a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(this.handleError<Product>('createProduct'))
    );
  }

  // Update an existing product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<void>('deleteProduct'))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log to console instead
      return of(result as T);
    };
  }
}
