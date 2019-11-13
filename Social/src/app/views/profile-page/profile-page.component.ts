import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }
  
  
  onSelectCoverFile(event) {
    this.hideUploadCoverButton=false;
    this.showUploadCoverButton=true;
    this.hideCoverImage=true;

    console.log('cover');

    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        this.urlCover = event.target.result;
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
        this.urlProfile = event.target.result;
      }
    }
  }

}
