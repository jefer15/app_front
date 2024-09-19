import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path = "/user";
  constructor(private _http: HttpClient, private router: Router) { }
  register(data: any) {
    const url = `${environment.uri}${this.path}/register`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  users() {
    const url = `${environment.uri}${this.path}`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  updateUser(id:number, data:any) {
    const url = `${environment.uri}${this.path}/${id}`;
    return this._http.put(url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  deleteUser(id:number) {
    const url = `${environment.uri}${this.path}/${id}`;
    return this._http.delete(url).pipe(map((response: any) => {
      return response;
    }));
  }
}
