import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  votesCount=0;

  constructor(
    private server: RequestService,
    private session:  SessionService
    ) { }


  ngOnInit() {
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
      this.votesCount++;
      this.server.post('LIKE',{key:'id',value:this.session.getGuestID()}).subscribe()
   }else{
     this.votesCount--;
   }

  }
}


