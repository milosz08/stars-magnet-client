/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRootComponent } from './app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonsModule } from './modules/commons/commons.module';
import { JwtRefreshInterceptor } from './modules/commons/interceptors/jwt-refresh/jwt-refresh.interceptor';

@NgModule({
  declarations: [AppRootComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtRefreshInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
