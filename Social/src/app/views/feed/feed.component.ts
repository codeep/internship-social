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

  constructor(
    private router:Router,
    private sessionService:SessionService
    ) { }

  ngOnInit() {
    debugger
    this.name = this.sessionService.getUser().firstname + " " +  this.sessionService.getUser().lastname
    // this.name = this.sessionService.user.firstname + " " + this.sessionService.user.lastname
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
