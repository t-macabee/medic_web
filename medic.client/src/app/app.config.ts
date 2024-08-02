import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {errorInterceptor} from "./interceptors/error.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {jwtInterceptor} from "./interceptors/jwt.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {loadingInterceptor} from "./interceptors/loading.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(
      BsDropdownModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),
      NgxSpinnerModule.forRoot({
        type: 'square-jelly-box'
      })
    ), provideAnimationsAsync()
  ]
};
