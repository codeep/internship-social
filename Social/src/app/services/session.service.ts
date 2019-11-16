import { Injectable } from '@angular/core';
@Injectable()
export class SessionService {
    private token;
   getToken() {
       return localStorage.getItem('token');
   }
   setToken(token) {
       localStorage.setItem('token', token);
   }
   getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
<<<<<<< HEAD
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
=======

   setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

>>>>>>> 6cc2a243668cbfe439abe4ef767066c5960f4d3d
   logout() {
    }
}