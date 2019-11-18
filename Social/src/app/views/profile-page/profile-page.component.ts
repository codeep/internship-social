import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';

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

  constructor(private service:RequestService) {

  }

  ngOnInit() {
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
  openConnectionsButton(){
    this.connect=true;
    this.myPosts=false;
    this.openCreatePost=false;
    this.openConnections=true;
    this.openDetails=false;
    this.details=false;
  }

  openMyPostsButton(){
    this.myPosts=true;
    this.connect=false;
    this.openCreatePost=true;
    this.openConnections=false;
    this.details=false;
    this.openDetails=false;
  }
}
