import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../interfaces/response.interface'
import { FormBuilder, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  firstname;
  lastname;
  email;
  birthdate;
  occupation;
  location;
  bio;
  openEdit=false;
  allowToEdit=false;
  openSave=false;
  sendDetails;

  constructor(private server: RequestService,
              private session: SessionService,
              private fb: FormBuilder) { }

  detail = this.fb.group({
    firstname: [{
      value: null,
      disabled: true
    },
    Validators.required],
    lastname: [{
      value: null,
      disabled: true
    },
    Validators.required],
    email: [{
      value: null,
      disabled: true
    },
    Validators.required],
    birthdate: [{
      value: null,
      disabled: true
    },
    Validators.required],
    occupation: [{
      value: null,
      disabled: true
    },
    Validators.required],
    location: [{
      value: null,
      disabled: true
    },
    Validators.required],
    bio: [{
      value: null,
      disabled: true
    },
    Validators.required],
  });

  ngOnInit() {
    this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID()})
      .subscribe((getDetails: Response) => {
        if (getDetails.status >= 200 && getDetails.status < 300 && getDetails.data) {
          this.detail.setValue({
            firstname: getDetails.data.user.firstname,
            lastname: getDetails.data.user.lastname, 
            email: getDetails.data.user.email, 
            birthdate: getDetails.data.user.birthdate,
            occupation: getDetails.data.user.occupation,
            location: getDetails.data.user.location,
            bio: getDetails.data.user.bio
          });
        }
      });
      if(this.session.getUser()['_id'] == this.session.getGuestID()){
        this.openEdit=true;
      }
  }
  allowToEditButton(){
    this.allowToEdit=true;
    this.openSave=true;
    this.detail.enable();
  }
  saveButton(){
    this.allowToEdit=false;
    this.detail.disable();
    this.sendDetails=this.detail.value;
    console.log(this.sendDetails); 
    this.server.post('DETAILS',this.sendDetails).subscribe((response: Response) => {
      if (response.status >= 200 && response.status < 300) {
          this.openSave = false;
      } 
    })
  }
}
