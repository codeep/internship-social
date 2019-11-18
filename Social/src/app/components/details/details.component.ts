import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../interfaces/response.interface'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  name;
  surname;
  email;
  birthdate;
  occupation;
  location;


  constructor(private server: RequestService,
    private session: SessionService) { }

  ngOnInit() {
    this.server.get('USERS_ID', { key: 'id', value: this.session.getUser()['_id'] })
      .subscribe((getDetails: Response) => {
        if (getDetails.status >= 200 && getDetails.status < 300 && getDetails.data) {
          this.name = getDetails.data.user.firstname,
          this.surname = getDetails.data.user.lastname,
          this.email = getDetails.data.user.email,
          this.birthdate = getDetails.data.user.birthdate,
          this.occupation = getDetails.data.user.occupation,
          this.location = getDetails.data.user.location
        }
      });
  }

}
