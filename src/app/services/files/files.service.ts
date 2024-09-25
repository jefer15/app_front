import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  path = "/inventory";
  constructor(private _http: HttpClient, private router: Router) { }

  inventories() {
    const url = `${environment.uri}${this.path}`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  createInventory(data:any) {
    const url = `${environment.uri}${this.path}`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }
}
