import { Injectable } from '@angular/core';
@Injectable()
export class SessionService {
    private token;
    user;
   getToken() {
       return localStorage.getItem('token');
   }
   setToken(token) {
       localStorage.setItem('token', token);
   }

   logout() {
   }
}