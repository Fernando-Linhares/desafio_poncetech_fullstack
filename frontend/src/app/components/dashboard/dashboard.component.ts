import { Component } from '@angular/core';
import {ServicesProviderModule} from "../../services-provider/services-provider.module";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../services/auth/user.model";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {ModuleDropdownComponent} from "../module-dropdown/module-dropdown.component";
import {NgClass, NgForOf} from "@angular/common";
import {Link} from "../module-dropdown/Link";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ServicesProviderModule,
    ModuleDropdownComponent,
    NgForOf,
    NgClass,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user!: User|null;
  modules!:  Array<any>;
  toggleSidebar: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.fetchUser();
    await this.fetchModules();
  }

  async fetchModules(): Promise<void> {

    let currentRoute = (uri: string) => uri == this.router.url;

    this.modules = [
      {
        icon: 'portrait',
        name: 'Gerenciamento de usuários',
        links: [
          new Link('Lista de usuários ', '/dashboard', currentRoute('/dashboard')),
        ]
      },
    ]
  }

  private async fetchUser() {
    this.user = await this.authService.getUserLoggedAsync()
  }

  public logout() {
    this.authService.logout();
    this.gotoLogin();
  }

  private gotoLogin(): void {
    this.router.navigate(['/login']);
  }

  public gotoHome() {
    this.router.navigate(['/dashboard'])
  }
}
