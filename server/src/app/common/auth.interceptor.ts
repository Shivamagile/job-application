import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('auth_token');

     // List of endpoints to exclude from authentication
     const excludedEndpoints = ['job-application/create'];

     // Check if the request URL is in the excluded list
     if (authToken && !excludedEndpoints.some(url => request.url.includes(url))) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 error (Unauthorized)
          // For example, log out the user and redirect to login page
          localStorage.removeItem('auth_token');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
