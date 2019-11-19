import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import  '../../endpoints'
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  name:string
  id:number
  constructor(
    private router:Router,
    private sessionService:SessionService
    ) { }

  ngOnInit() {
    this.name = this.sessionService.getUser().firstname + " " +  this.sessionService.getUser().lastname
    this.id=this.sessionService.getUser()._id;
    console.log(this.id)
  }

  sendId(){
    this.sessionService.setGuestID(this.id);
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
