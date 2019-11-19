import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( 
    private myServer: RequestService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
  }
  onClickFollow(){
    
  }
}
