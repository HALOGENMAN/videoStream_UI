import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { BaseService } from '../servide/base.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(typeof window === 'undefined'){
    return next(req);
  }

  const router = inject(Router)
  const baseService = inject(BaseService);

  let token: string = sessionStorage.getItem('token') ?? '';
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(clonedRequest).pipe(
    catchError((error) => {
      // Check if the error is a 401 Unauthorized
      if (error.status === 401) {
        return baseService.refreshToken().pipe(
          switchMap((payload:any) => {
            // Save the new token to localStorage
            localStorage.setItem('token', payload.newToken);

            // Retry the original request with the new token
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${payload.newToken}`,
              },
            });
            return next(retryRequest);
          }),
          catchError((refreshError) => {
            console.error('Failed to refresh token:', refreshError);
            // Handle refresh token failure (e.g., redirect to login)
            router.navigate(['/loginSignUp']);
            return throwError(()=> refreshError);
          })
        );
      }
      router.navigate(['/loginSignUp']);
      return throwError(()=> error);
      
      // If the error is not a 401, rethrow it
    })
  );
          
};
