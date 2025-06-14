import { Injectable } from '@angular/core';
import { environment } from '../../../public/environments/environment'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl:string = environment.baseUrl
  configs: any;
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    // 'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Uncomment and set if you have auth
  });

  constructor(
    private http: HttpClient,
  ) { 
  }

  /**
   * Handles HTTP errors uniformly.
   * @param error The HttpErrorResponse object.
   * @returns An Observable that emits an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred.
      console.error('Client-side error:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error?.status}, ` +
        `body was: ${JSON.stringify(error?.error)}`
      );
      // if (error.status === 0) {
      //   errorMessage = 'Network error or CORS issue. Please check your API server.';
      // } else {
      //   errorMessage = `Server error (Status: ${error.status}): ${error.error.message || JSON.stringify(error.error)}`;
      // }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }

  get<T>(path: string, options?: { headers?: HttpHeaders, params?: any }): Observable<T> {
    const url = `${this.baseUrl}${path}`;
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders,
      params: options?.params
    };
    console.log(`GET Request to: ${url}`);
    return this.http.get<T>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(path: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${this.baseUrl}${path}`;
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders
    };
    console.log(`POST Request to: ${url} with body:`, body);
    return this.http.post<T>(url, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(path: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${this.baseUrl}${path}`;
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders
    };
    console.log(`PUT Request to: ${url} with body:`, body);
    return this.http.put<T>(url, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(path: string, options?: { headers?: HttpHeaders, params?: any }): Observable<T> {
    const url = `${this.baseUrl}${path}`;
    const httpOptions = {
      headers: options?.headers || this.defaultHeaders,
      params: options?.params
    };
    console.log(`DELETE Request to: ${url}`);
    return this.http.delete<T>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  refreshToken():Observable<any> {
    return this.post('/v1/auth/refreshToken',{
      token: sessionStorage.getItem('refreshToken'),
      id: Number.parseInt(sessionStorage.getItem('id')?? '-1')
    }); 
  }

  addDefaultHeader(key: string, value: string): void {
    this.defaultHeaders = this.defaultHeaders.set(key, value);
  }

}
