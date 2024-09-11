import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout/layout.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isHandset$: Observable<boolean>;

  constructor(
    private layoutService: LayoutService,
    private _loginService: LoginService
  ) {
    this.isHandset$ = this.layoutService.isHandset$;
  }

  ngOnInit(): void {}

  logout() {
    this._loginService.logoutUser();
  }
}
