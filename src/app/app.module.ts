import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonsModule } from '~/app-commons/commons.module';
import { JwtRefreshInterceptor } from '~/app-commons/interceptors/jwt-refresh/jwt-refresh.interceptor';
import { AppRootComponent } from './app-root.component';
import { AppRoutingModule } from './app-routing.module';

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
