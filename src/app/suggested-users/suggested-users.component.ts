import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../services/request-service.service';
import { Response } from 'src/interfaces/response.interface';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.component.html',
  styleUrls: ['./suggested-users.component.css']
})
export class SuggestedUsersComponent implements OnInit {
  @Input() sugLimit;
  users = [];
  loginUser: any;
  followings;
  trueOrFalse = [];
  constructor(
    private myService: RequestService,
    private session: SessionService) {
  }
  ngOnInit() {
    this.myService.post('NEARBY', null, null, [{ key: 'limit', value: this.sugLimit }])
      .subscribe((response: Response) => {
        if (response.status >= 200 && response.status < 300 && response.data) {
          this.users = response.data;
          this.loginUser = this.session.getUser();
          this.followings = this.loginUser.followings;
          for (let i = 0; i < this.users.length; i++) {
            this.trueOrFalse[i] = this.followings.includes(this.users[i]['_id']);
          }
        }
      });
  }
  onClickFollow(item, i) {
    this.myService.post('FOLLOW', item['_id'], { key: 'id', value: item['_id'] })
      .subscribe(date => {
        this.trueOrFalse[i] = !this.trueOrFalse[i];
      });
  }
  sendId(data) {
    this.session.setGuestID(data);
  }
}