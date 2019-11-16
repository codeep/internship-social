import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../interfaces/response.interface';

@Component({
  selector: 'app-wisard',
  templateUrl: './wisard.component.html',
  styleUrls: ['./wisard.component.css']
})
export class WisardComponent implements OnInit {
  openusers = false;
  arr=[1,2,3, 1,2,3];
  wisard:any;
  ditails = this.fb.group({
    occupation: ['', Validators.required],
    location: ['', Validators.required],
    bio: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private myServer: RequestService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
   
  }
  onSubmit(){
    // debugger;
    if(this.ditails.valid){
      this.wisard = this.ditails.value;
      this.wisard.firstname = this.sessionService.getUser().firstname;
      this.wisard.lastname = this.sessionService.getUser().lastname; 
      this.myServer.post('DETAILS',this.wisard).subscribe((response: Response) => {
        if (response.status >= 200 && response.status < 300) {
          this.openusers = true;
        } 
      })
    }
  }
  goToFeed(){
    this.router.navigate(['/feed']);
  }
}
