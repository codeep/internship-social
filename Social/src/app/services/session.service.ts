import { Injectable } from '@angular/core';
@Injectable()
export class SessionService {
   get token() {
       return this.token;
   }
   set token(token) {
       this.token = token;
   }
   logout() {
   }
}