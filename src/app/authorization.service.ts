import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor  {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //get token
    const token = localStorage.getItem("token")
    //if found
    if(token){
      //create cloned req
      const clonedReq = req.clone({
        headers:req.headers.set("Authorization","Bearer "+token)
      })
      //forward the req
      return next.handle(clonedReq)
    }
    else{
      //forward the req
      return next.handle(req)
    }
  }
}
