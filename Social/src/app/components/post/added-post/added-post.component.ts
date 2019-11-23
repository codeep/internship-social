import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../../interfaces/response.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-added-post',
  templateUrl: './added-post.component.html',
  styleUrls: ['./added-post.component.css']
})
export class AddedPostComponent implements OnInit {
  @Input() post;
  name;
  surname;
  title;
  content;
  postDeleteBtn = false;
  image;
  constructor(
    private server: RequestService,
    private session: SessionService) { }


  ngOnInit() {
    if (this.session.getUser()['_id'] == this.post.author._id) {
      this.postDeleteBtn = true;
    }
  }
  removePost() {
    this.server.delete('POSTS_ID', { key: 'id', value: this.post['_id'] }).subscribe((responce: Response) => {

      window.location.reload();
    });
  }
  sendId() {
    this.session.setGuestID(this.post.author._id);
  }
}
