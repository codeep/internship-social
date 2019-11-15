import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import  '../../endpoints'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor() { 
    // server.get(POST_NEARBY )
  }

  ngOnInit() {
  }

}
