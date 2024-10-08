import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  private userSubject = new BehaviorSubject<any>(this.getUser());
  path = "/auth";

  constructor(private _http: HttpClient, private router: Router) { }

  login(data: any) {
    const url = `${environment.uri}${this.path}`;
    return this._http.post(url, data).pipe(map((response: any) => {
      if(response?.data?.token){
        this.setToken(response.data.token);
        this.setUser(response.data.user);
      }
      return response;
    }));
  }

  register(data: any) {
    const url = `${environment.uri}${this.path}/register`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
    this.tokenSubject.next(token);
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logoutUser(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }

  getUserSubject(): BehaviorSubject<any> {
    return this.userSubject;
  }
}
