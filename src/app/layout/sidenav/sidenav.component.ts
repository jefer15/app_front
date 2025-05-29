import { Component, OnInit, OnDestroy} from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  menuItems: any[] = [];
  private menuSubscription!: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse al observable del menú
    this.menuSubscription = this.loginService.getMenuItemsSubject().subscribe(items => {
      this.menuItems = items;
    });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar memory leaks
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
}
