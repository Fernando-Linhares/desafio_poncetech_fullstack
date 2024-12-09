import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {User} from "../services/auth/user.model";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  if (authService.check()) {

    let user: User|null = await authService.getUserLoggedAsync();

    if(user) {
      if(authService.getSession()?.refreshable()) {
        authService.refresh();
      }

      return true;
    }

    authService.logout();
    router.navigate(['/login'])
    return false;
  }

  router.navigate(['/login'])
  return false;
};
