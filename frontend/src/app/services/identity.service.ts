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

  private decodeToken(): unknown {
    if (!this.token) {
      return null;
    }
    return jwtDecode(this.token);
  }

  getPermissions(): Permission[] {
    const decodedToken = this.decodeToken();
    const tokenContent = decodedToken as { permissions: string[] };
    return tokenContent.permissions || [];
  }

  hasPermission(permission: Permission): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(permission);
  }

  hasPermissions(permissions: Permission[]): boolean {
    const userPermissions = this.getPermissions();
    return permissions.every((p) => userPermissions.includes(p));
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.apiService.post<any>(`${this.endpoint}/login`, body).pipe(
      map((response) => {
        this.token = response.token;
        localStorage.setItem(TOKEN_KEY, this.token as string);
        this.isAuthenticatedSubject.next(true);
        return response;
      }),
      catchError((error) => {
        throw error;
      }),
    );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  getAuthToken(): string | null {
    return this.token;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
