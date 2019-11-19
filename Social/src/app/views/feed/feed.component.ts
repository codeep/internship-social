import { Component, OnInit, HostListener } from '@angular/core';
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
  posts = []
  offset = 0;
  constructor(
    private router:Router,
    private server: RequestService,
    private sessionService:SessionService
    ) { }

  ngOnInit() {
    this.name = this.sessionService.getUser().firstname + " " +  this.sessionService.getUser().lastname
    this.id=this.sessionService.getUser()._id;
    this.server.get('FEED',{key:'id',value:this.sessionService.getGuestID()},[{key:'limit',value:10},{key:'offset',value:this.offset}])
      .subscribe((posts: { data:[] }) => 
      {
        this.posts.concat(posts.data)
        this.offset++
      });
  }

  sendId(){
    this.sessionService.setGuestID(this.id);
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
  @HostListener("window:scroll", ["$event"])  
  onScroll(){
      let scrollHeight;
      let totalHeight;
      scrollHeight = document.body.scrollHeight;
      totalHeight = window.scrollY + window.innerHeight;
      // TODO refactor
      if (totalHeight >= scrollHeight) {

        this.server.get('FEED',{key:'id',value:this.sessionService.getGuestID()},[{key:'limit',value:10},{key:'offset',value:this.offset}])
        .subscribe((posts: { data:[] }) => 
        {
          this.posts.concat(posts.data)
          this.offset++
        });  
      }
    
  }
}
