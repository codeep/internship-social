import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import  '../../endpoints'
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(
    private router:Router,
    
    ) { 
    // server.get(POST_NEARBY )
  }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
