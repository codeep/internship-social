import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import {FormBuilder, FormControl, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { Response } from '../../../interfaces/response.interface';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder, 
    private myServer: RequestService,
    private sessionService: SessionService,
    private router: Router) { 
  }

  ngOnInit() {
  }
  onSubmit(){
    // console.log(this.login.value);

    this.myServer.post('LOGIN', this.login.value, null, null, false)
      .subscribe((response: Response) => {
        if (response.status >= 200 && response.status < 300 && response.data && response.data.token) {
          this.sessionService.setToken(response.data.token);
        }
        this.router.navigate(['/feed']);
      });
  
  }
}
