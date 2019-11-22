import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../../interfaces/response.interface';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-added-post',
  templateUrl: './added-post.component.html',
  styleUrls: ['./added-post.component.css']
})
export class AddedPostComponent implements OnInit {
  @Input()  post;
  name; 
  surname;
  title;
  content;
  postDeleteBtn=false;
  image;
  constructor(
    private server: RequestService,
    private session: SessionService) { }


  ngOnInit() {
    if (this.session.getUser()['_id'] == this.session.getGuestID()) {
      this.postDeleteBtn= true;
    }
    this.server.get('', { key: 'id', value: this.session.getGuestID() })
      .subscribe((getName: Response) => {
        if (getName.status >= 200 && getName.status < 300 && getName.data) {
          this.image=getName.data.user.file;
          // this.hideUploadProfileButton=false;
          // this.hideUploadCoverButton=false;
        }
      });


  }
  removePost(){
    this.server.delete('POSTS_ID',{key:'id',value:this.post['_id']}).subscribe();
  }
  sendId(){
    this.session.setGuestID(this.post.author._id);    
  }
}
