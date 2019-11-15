import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RequestService } from 'src/app/services/request-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register = this.fb.group({
    firstname: [''],
    lastname: [''],
    email: [''],
    birthdate: [''],
    password: [''],
    confirmPassword: ['']
  });
  constructor(private fb: FormBuilder, private myServer: RequestService) { }

  ngOnInit() {
  }
  onSubmit(){
    //  console.log(this.myServer.post('REGISTER', this.register.value));
  }

}
