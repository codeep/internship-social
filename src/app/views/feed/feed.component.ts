import { Component, OnInit, HostListener } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posting = false;
  name: string
  id: number
  posts = []
  offset = 0;
  limit = 10;
  sugLimit = 3;
  user
  newpost: any
  constructor(
    private router: Router,
    private server: RequestService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    this.user = this.sessionService.getUser();
    this.id = this.user._id;
    this.name = this.user.firstname + " " + this.user.lastname
    this.server.get('FEED', { key: 'id', value: this.sessionService.getGuestID() }, [{ key: 'limit', value: this.limit }, { key: 'offset', value: this.offset }])
      .subscribe((posts: { data: [] }) => {
        this.posts = posts.data;
        this.offset += 10
      });
  }

  sendId() {
    this.sessionService.setGuestID(this.id);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
  @HostListener("window:scroll", ["$event"])
  onScroll() {
    let scrollHeight;
    let totalHeight;
    scrollHeight = document.body.scrollHeight;
    totalHeight = window.scrollY + window.innerHeight;
    if (totalHeight >= scrollHeight) {
      this.server.get('FEED', { key: 'id', value: this.sessionService.getGuestID() }, [{ key: 'limit', value: this.limit }, { key: 'offset', value: this.offset }])
        .subscribe((posts: { data: [] }) => {
          this.posts.push(...posts.data)
          this.offset += 10;
        });
    }

  }
  getNewPost(event) {
    this.newpost = {
      _id: event['_id'],
      author: {
        _id: this.user._id,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        avatar: this.user.avatar
      },
      title: event.title,
      content: event.content,
      file: event.file,
      likes: []
    }

    this.posts.unshift(this.newpost);

  }
  
  delete(post) {
    const postIndex = this.posts.findIndex(p => p._id === (post._id || post));
    this.posts.splice(postIndex, 1);
  }
  
}
