import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import {FormBuilder, FormControl, FormGroup, Validators, EmailValidator} from '@angular/forms';

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

  constructor(private fb: FormBuilder, private myServer: RequestService) { 
   
  }

  ngOnInit() {
  }
  onSubmit(){
    // console.log(this.login.value);

    // this.myServer.post('LOGIN', this.login.value, null, null, false).subscribe(x=>console.log(x));
  
  }
}
