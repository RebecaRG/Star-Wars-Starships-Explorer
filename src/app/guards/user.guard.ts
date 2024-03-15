import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  if(localStorage.getItem('email')){
    return true;
  }else{
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
