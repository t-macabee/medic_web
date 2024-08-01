import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      toastr.error(errorMessage);
      console.error('Error Details:', error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
