import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class SessionService {
    private token;
    guestID = new Subject();
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
    setGuestID(data){
        this.guestID.next(data);
        localStorage.setItem('guest', data);
    }
    getGuestID(){
        return localStorage.getItem('guest');
    }
    test(){
        return this.guestID;
    }
   logout() {
   }
}