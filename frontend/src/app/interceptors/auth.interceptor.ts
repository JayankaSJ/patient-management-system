import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IdentityService } from '../services/identity.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const identityService = inject(IdentityService);
  const router = inject(Router); // Use Angular's inject function to get router service

  // Retrieve the token from localStorage (or other storage mechanisms like sessionStorage, or cookies)
  const token = identityService.getAuthToken(); // Use the identity service to get the token

  // If token exists, clone the request and add the Authorization header
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Handle the HTTP request with the modified (or original) request
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle unauthorized errors (e.g., redirect to login)
        router.navigate(['/login']);
      }
      throw error; // Rethrow the error to be handled further
    })
  );
};
