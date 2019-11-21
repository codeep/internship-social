import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() item;
  trueOrFalse = false;
  followings;
  loginUser;
  constructor(
    private myServer: RequestService,
    private session: SessionService,
    private router: Router) { }
  ngOnInit() {
    this.loginUser =this.session.getUser();
    this.followings = this.loginUser.followings;
    this.trueOrFalse = this.followings.includes(this.item['_id']);
  }
  sendId(data){
    this.session.setGuestID(data);
  }
  onClickFollow(item, i){
    this.myServer.post('FOLLOW', item['_id'], {key:'id',value:item['_id']})
    .subscribe(date=>{
      console.log(date);
      this.trueOrFalse = !this.trueOrFalse;});
  }
}