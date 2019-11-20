import { Component, OnInit, HostListener } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Response } from '../../../interfaces/response.interface'
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
  offset=0;
  openMy=false;


      
  public imagePath;
  imgURL: any;
  public message: string;




  constructor(
    private server: RequestService,
    private session: SessionService) { }
  

  ngOnInit() {
      this.server.get('WALL',{key:'id',value:this.session.getGuestID()},[{key:'limit',value:10},{key:'offset',value:0}])
      .subscribe((posts: { data:[] }) => {
        this.posts=posts.data
        this.offset++
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
        this.server.get('WALL',{key:'id',value:this.session.getGuestID()},[{key:'limit',value:10},{key:'offset',value:this.offset}])
        .subscribe((posts: { data:[] }) => {
          this.posts.concat(posts.data)
          this.offset++
        });
      }
    
  }
  
  onSelectCoverFile(event) {
    this.hideUploadCoverButton=false;
    this.showUploadCoverButton=true;
    this.hideCoverImage=true;

    if(event.target.files && event.target.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        // this.urlCover = event.target.result;
      }
    }

    
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
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
