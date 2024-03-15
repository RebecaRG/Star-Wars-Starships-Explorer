import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const userGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('email')){
    return true;
  }else{
    const router =inject(Router);
    return router.navigate(['/login']);
  }
};
