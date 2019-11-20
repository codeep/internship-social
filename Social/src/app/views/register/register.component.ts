import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { Response } from '../../../interfaces/response.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userexists = null;
  errorsOpen = false;
  startDate = new Date(1990, 0, 1);
  register = this.fb.group({
    firstname: ['',[Validators.required, Validators.minLength(2)]],
    lastname: ['',[Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
    birthdate: ['', Validators.required],
    password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    confirmPassword: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, 
    private myServer: RequestService,
    private sessionService: SessionService,
    private router: Router,
    private toastr:ToastrService
  ){ }


  ngOnInit() {
  }
  onSubmit(){
    this.errorsOpen = false;
    if(this.register.valid && this.register.value.confirmPassword === this.register.value.password){
      this.myServer.post('REGISTER', this.register.value, null, null, false)
      .subscribe((response: Response) => {
        if (response.status >= 200 && response.status < 300 && response.data) {
          this.toastr.success("Hello, You are registered. Welcome!")
          this.router.navigate(['/login']);
        } else{
          this.errorsOpen = true;
          this.userexists = 'This Email addres is not empty.'
        }
      });
    }else {
      this.errorsOpen = true;
      this.validateAllFormFields(this.register);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
          if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);           
      }
    });
  }
  errorsValidation(field){
    switch(field){
      case 'firstname': 
        const firstnameErrors = this.register.controls.firstname.errors;
        if(firstnameErrors.required){
          return 'Firstname is required';
        } else {
          return "Firstname is min.";
        }
        break;
      case 'lastname': 
        const lastnameErrors = this.register.controls.lastname.errors;
        if(lastnameErrors.required){
          return 'Lastname is required.';
        } else {
          return "Lastname is min.";
        }
        break; 
      case 'email': 
        const emailErrors = this.register.controls.email.errors;
        if(emailErrors.required){
          return 'Email is required.';
        } else {
          return "It's not email addres.";
        }
        break;
      case 'birthdate': 
        const birthdateErrors = this.register.controls.birthdate.errors;
        if(birthdateErrors.required){
          return 'birthdate is required.';
        }
        break;   
      case 'password':
        const passErrors = this.register.controls.password.errors;
        if(passErrors.required){
          return 'Password is required.';
        }else if(passErrors.minlength){
          return 'Password is min.'
        }else if(passErrors.maxlength){
          return 'Password is max.'
        }
        break; 
      case 'confirmPassword': 
        const confirmpassErrors = this.register.controls.password.errors;
        if(confirmpassErrors.required){
          return 'Confirm Password is required.';
        } else if(this.register.value.confirmPassword !== this.register.value.password){
          return 'Passwords are not match.';
        }
    }
  }
}
