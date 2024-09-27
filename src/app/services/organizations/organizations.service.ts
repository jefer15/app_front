import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  path = "/organization";

  constructor(private _http: HttpClient, private router: Router) { }

  organizations() {
    const url = `${environment.uri}${this.path}`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  createOrganization(data: any) {
    const url = `${environment.uri}${this.path}`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  updateOrganization(id:number, data: any) {
    const url = `${environment.uri}${this.path}/${id}`;
    return this._http.put(url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  deleteOrganization(id:number) {
    const url = `${environment.uri}${this.path}/${id}`;
    return this._http.delete(url).pipe(map((response: any) => {
      return response;
    }));
  }
}
