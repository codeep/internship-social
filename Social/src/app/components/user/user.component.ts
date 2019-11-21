import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { Response } from 'src/interfaces/response.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() item;
  trueOrFalse = false;
  myPage = true;
  loginUser;
  constructor(
    private myServer: RequestService,
    private session: SessionService,
    private router: Router) { }
  ngOnInit() {
    this.myServer.get('USERS_ID', { key: 'id', value: this.session.getUser()._id })
      .subscribe((getUser: Response) => {
        if (getUser.status >= 200 && getUser.status < 300 && getUser.data) {
          this.loginUser = getUser.data.user;
          this.trueOrFalse = this.loginUser.followings.includes(this.item['_id']);
          if(this.item._id == this.session.getUser()._id){
            this.myPage = false;
          }
        }
      });
  }
  sendId(data){
    this.session.setGuestID(data);
    this.router.navigateByUrl(`profile/${data}`);
  }
  onClickFollow(item, i){
    this.myServer.post('FOLLOW', item['_id'], {key:'id',value:item['_id']})
    .subscribe(date=>{
     
      this.trueOrFalse = !this.trueOrFalse;});
  }
}