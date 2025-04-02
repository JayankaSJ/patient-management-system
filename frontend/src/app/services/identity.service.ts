import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_KEY } from '../common/constants';
import { BehaviorSubject, Observable, map, catchError } from 'rxjs';
import { ApiService } from './api.service';

type Permission = string;

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private token: string | null;
  private endpoint = 'auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {
    this.token = localStorage.getItem(TOKEN_KEY);
    this.isAuthenticatedSubject.next(!!this.token);
  }

  // Decode JWT and return the decoded payload
  private decodeToken(): unknown {
    if (!this.token) {
      return null;
    }
    return jwtDecode(this.token);
  }

  // Get the permissions from the token
  getPermissions(): Permission[] {
    const decodedToken = this.decodeToken();
    const tokenContent = decodedToken as { permissions: string[] };
    return tokenContent.permissions || [];
  }

  // Check if the user has a specific permission
  hasPermission(permission: Permission): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(permission);
  }

  // Check if the user has multiple permissions (useful for roles-based access)
  hasPermissions(permissions: Permission[]): boolean {
    const userPermissions = this.getPermissions();
    return permissions.every((p) => userPermissions.includes(p));
  }

  // Login method
  login(username: string, password: string): Observable<any> {
    const body = { username, password }; // Payload for the login request

    return this.apiService.post<any>(`${this.endpoint}/login`, body).pipe(
      map((response) => {
        // Assuming the response contains a token
        this.token = response.token;
        localStorage.setItem(TOKEN_KEY, this.token as string);
        this.isAuthenticatedSubject.next(true); // Update auth status
        return response;
      }),
      catchError((error) => {
        // Handle login errors (for example: wrong credentials)
        throw error;
      })
    );
  }

  // Logout method
  logout(): void {
    this.token = null;
    localStorage.removeItem(TOKEN_KEY); // Remove the token from local storage
    this.isAuthenticatedSubject.next(false); // Update auth status
  }

  // Get the current auth token
  getAuthToken(): string | null {
    return this.token;
  }

  // Observable to get authentication status
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
