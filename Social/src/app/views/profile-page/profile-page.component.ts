import { Component, OnInit, HostListener } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../interfaces/response.interface'
import { of } from 'rxjs';
import { post } from 'selenium-webdriver/http';
@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  hideCoverImage=false;
  urlCover;
  urlProfile;
  hideUploadCoverButton=true;
  hideUploadProfileButton=true;
  showUploadCoverButton=false;
  showUploadProfileButton=false;
  hideProfileImage=false;
  openDetails=false;
  openConnections=false;
  openCreatePost=true;
  openFollowers=false;
  myPosts=true;
  connect=false;
  details=false;
  openEdit=false;
  name;
  surname;
  posts = [];
  offset=1;
  limit=10;
  openMy=false;
  constructor(
    private server: RequestService,
    private session: SessionService) { }
  

  ngOnInit() {
      this.server.get('WALL',{key:'id',value:this.session.getGuestID()},[{key:'limit',value:this.limit},{key:'offset',value:this.offset}])
      .subscribe((posts: { data:[] }) => {
        this.posts=posts.data
        this.offset+=10
      });
      
      this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID()})
      .subscribe((getName: Response) => {
        if (getName.status >= 200 && getName.status < 300 && getName.data) {
          this.name = getName.data.user.firstname,
          this.surname = getName.data.user.lastname          
        }
      });
      if(this.session.getUser()['_id'] == this.session.getGuestID()){
        this.openEdit=true;
        this.openMy=true;
      }   
      else{
        this.openCreatePost=false;
      }   
  }
  @HostListener("window:scroll", ["$event"])  
  onScroll(){
      let scrollHeight;
      let totalHeight;
      scrollHeight = document.body.scrollHeight;
      totalHeight = window.scrollY + window.innerHeight;
      if (totalHeight >= scrollHeight) {
        this.server.get('WALL',{key:'id',value:this.session.getGuestID()},[{key:'limit',value:this.limit},{key:'offset',value:this.offset}])
        .subscribe((posts: { data:[] }) => {

          debugger
          this.posts.concat(posts.data)
          this.offset+=10
          console.log(this.posts)
          console.log(posts)
        });
      }
    
  }
  
  onSelectCoverFile(event) {
    this.hideUploadCoverButton=false;
    this.showUploadCoverButton=true;
    this.hideCoverImage=true;


    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        // this.urlCover = event.target.result;
      }
    }
  }

  onSelectProfileFile(event) {
    this.showUploadProfileButton=true;
    this.hideUploadProfileButton=false;
    this.hideProfileImage=true;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { 
        // this.urlProfile = event.target.result;
      }
    }
  }

  openDetailsButton(){
    this.openConnections=false;
    this.openDetails=true;
    this.myPosts=false;
    this.openCreatePost=false;
    this.details=true;
    this.connect=false;
  }
  openFollowersButton() {
    this.openFollowers = true;
  }
  openConnectionsButton(){
    this.connect=true;
    this.myPosts=false;
    this.openCreatePost=false;
    this.openConnections=true;
    this.openDetails=false;
    this.details=false;
  }

  openMyPostsButton(){
    if(this.session.getUser()['_id'] == this.session.getGuestID()){
      this.openCreatePost=true;
    } else{
     this.openCreatePost=false;
    }
    this.myPosts=true;
    this.connect=false;
    this.openConnections=false;
    this.details=false;
    this.openDetails=false;
  }

}
