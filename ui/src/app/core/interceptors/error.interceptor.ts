import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ErrorMapperService } from '../services/error-mapper.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const errorMapper = inject(ErrorMapperService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toastService.error(errorMapper.getNetworkError());
      } else if (error.status === 500) {
        toastService.error(errorMapper.map(error));
      }
      
      return throwError(() => error);
    })
  );
};

