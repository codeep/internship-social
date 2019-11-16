import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Response } from '../../../interfaces/response.interface';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorEmail:boolean = false;
  errorPass:boolean = false;
  errorText:boolean = false;
  login = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
    password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
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
      this.errorEmail = false;
      this.errorPass = false;
    if(this.login.valid){
      this.myServer.post('LOGIN', this.login.value, null, null, false)
      .subscribe((response: Response) => {
        if (response.status >= 200 && response.status < 300 && response.data && response.data.token) {
          this.sessionService.setToken(response.data.token);
          this.sessionService.setUser(response.data.user);
          if(response.data.user.fulfilled){
            this.router.navigate(['/feed']);
          }else{
            this.router.navigate(['/wisard']);
          }
        }else{
          this.errorText = true;
        } 
      }
      });
    } else {
      if(this.login.controls.password.errors){
        this.errorPass = true;
      }
      if(this.login.controls.email.errors){
        this.errorEmail = true;
      }
      this.validateAllFormFields(this.login);
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
      case 'email': 
      const emailErrors = this.login.controls.email.errors;
          if(emailErrors.required){
              return 'Email is required';
          }else if(emailErrors.pattern){
            return 'It is not Email!!!'
          } else {
            return "It's not email addres.";
          }
          break;
      case 'password':
          const passErrors = this.login.controls.password.errors;
          if(passErrors.required){
            return 'Password is required';
          }else if(passErrors.minlength){
            return 'Password is min!!!'
          }else if(passErrors.maxlength){
            return 'Password is max!!!'
          }
          break;    
    }
  }
}
