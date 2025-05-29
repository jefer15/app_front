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
  menuItems = [
    {
      title: 'Usuarios',
      path: '/users',
      icon: 'person',
    },
    {
      title: 'Inventarios',
      path: '/files',
      icon: 'inventory',
    },
    {
      title: 'Tareas',
      path: '/tasks',
      icon: 'assignment',
    },
    {
      title: 'Organizaciones',
      path: '/organizations',
      icon: 'business',
    },
    {
      title: 'Gráficas',
      path: '/graphics',
      icon: 'bar_chart',
    }
  ];
  private menuItemsSubject = new BehaviorSubject<any[]>(this.getMenuItems());

  constructor(private _http: HttpClient, private router: Router) { }

  login(data: any) {
    const url = `${environment.uri}${this.path}`;
    return this._http.post(url, data).pipe(map((response: any) => {
      if(response?.data?.token){
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        this.setMenuItems(this.menuItems)
      }
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
    this.menuItemsSubject.next([]);
    this.router.navigate(["/login"]);
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }

  getUserSubject(): BehaviorSubject<any> {
    return this.userSubject;
  }

  getMenuItems(): any[] {
    const menuItems = localStorage.getItem('menuItems');
    return menuItems ? JSON.parse(menuItems) : [];
  }

  setMenuItems(menuItems: any[]): void {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    this.menuItemsSubject.next(menuItems);
  }

  getMenuItemsSubject(): BehaviorSubject<any[]> {
    return this.menuItemsSubject;
  }
}
