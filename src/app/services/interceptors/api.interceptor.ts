import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

   constructor(@Inject('API_URL') private url: string) {

   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // req.headers.set('key', '');
      // req.headers.set('idToken', '');
      console.log(req.headers);
      const clone = req.clone({
         //url: this.url + req.url
      });
      console.log(clone);
      return next.handle(clone);
   }
}