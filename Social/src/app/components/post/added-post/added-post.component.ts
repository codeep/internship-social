import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../../interfaces/response.interface';
@Component({
  selector: 'app-added-post',
  templateUrl: './added-post.component.html',
  styleUrls: ['./added-post.component.css']
})
export class AddedPostComponent implements OnInit {
  name;
  surname;
  constructor(
    private server: RequestService,
    private session: SessionService) { }
  ngOnInit() {
    this.server.get('USERS_ID', { key: 'id', value: this.session.getUser()['_id'] })
      .subscribe((getName: Response) => {
        if (getName.status >= 200 && getName.status < 300 && getName.data) {
          this.name = getName.data.user.firstname,
            this.surname = getName.data.user.lastname
        }
      });
  }
}
