import { Injectable } from '@angular/core';
@Injectable()
export class SessionService {
    private token;
    user:any;
   getToken() {
       return localStorage.getItem('token');
   }
   setToken(token) {
       localStorage.setItem('token', token);
   }

   getUser() {
    return JSON.parse(localStorage.getItem('user'));
    }
    setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    }

   logout() {
   }
}