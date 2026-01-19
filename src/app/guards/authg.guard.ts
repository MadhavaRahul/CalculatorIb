import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthSvcService } from '../service/auth-svc.service';

export const authgGuard: CanActivateFn = () => {
  const authsvc=inject(AuthSvcService)
  const router=inject(Router)
  if(authsvc.isAuthenticated()){
    return true;
  }else{
    router.navigateByUrl('/auth')
    return false
  }
};
