import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnChanges {
  votesCount=0;
  hasLiked = false;
  @Input() post;
  constructor(
    private server: RequestService,
    private session:  SessionService
    ) { }


  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['post'].currentValue) {
      if (this.post.likes.includes(this.session.getUser()._id)) {
        this.hasLiked = true;
      } 
    }
  }

  toggleEditable() {
      this.server.post('LIKE',{},{key:'id',value:this.post['_id']})
        .subscribe(like=>{
          this.hasLiked = !this.hasLiked;
          if (this.hasLiked) {
            this.post.likes.push(this.session.getUser()._id);
          } else {
            const index = this.post.likes.findIndex(userId => userId === this.session.getUser()._id);
            this.post.likes.splice(index, 1);
          }
        });
  }
}


