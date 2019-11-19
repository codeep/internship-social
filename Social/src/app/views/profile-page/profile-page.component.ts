import { Component, OnInit } from '@angular/core';
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
  myPosts=true;
  connect=false;
  details=false;
  following=false;
  followers=false;
  name;
  surname;
  openMy;

  constructor(
    private server: RequestService,
    private session: SessionService) { }
  

  ngOnInit() {
      this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID()})
      .subscribe((getName: Response) => {
        if (getName.status >= 200 && getName.status < 300 && getName.data) {
            this.name = getName.data.user.firstname,
            this.surname = getName.data.user.lastname
        }
        if(this.session.getUser()['_id'] != this.session.getGuestID()){
          this.openMy=false;
          this.openCreatePost=false;
        }
        else{
          this.openMy=true;
        }
      });
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
    this.following=false;
    this.followers=false;
  }

  openConnectionsButton(){
    this.connect=true;
    this.myPosts=false;
    this.openCreatePost=false;
    this.openConnections=true;
    this.openDetails=false;
    this.details=false;
    this.following=false;
    this.followers=false;
  }

  openMyPostsButton(){
    this.myPosts=true;
    this.connect=false;
    this.openCreatePost=true;
    this.openConnections=false;
    this.details=false;
    this.openDetails=false;
    this.following=false;
    this.followers=false;
  }
  openFollowingButton(){
    this.following=true;
    this.followers=false;
  }
  openFollowersButton() {
    this.followers = true;
    this.following=false;
  }
}
