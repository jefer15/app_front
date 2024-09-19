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

  path = "/files";
  constructor(private _http: HttpClient, private router: Router) { }

  register(data: any) {
    const url = `${environment.uri}${this.path}/register`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }
}
