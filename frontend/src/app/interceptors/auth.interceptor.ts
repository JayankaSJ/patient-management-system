import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IdentityService } from '../services/identity.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const identityService = inject(IdentityService);
  const router = inject(Router);

  const token = identityService.getAuthToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      throw error;
    }),
  );
};
