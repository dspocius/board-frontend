import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './../../services/auth.service'; 

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(AuthService);
  const androidToken = tokenService.getToken(); 

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${androidToken}`,
    },
  });

  return next(modifiedReq);

};
