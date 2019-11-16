import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service.service';

import { Response } from '../../../interfaces/response.interface';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  name;
  surname;

  hideCoverImage = false;
  urlCover;
  urlProfile;
  hideUploadCoverButton = true;
  hideUploadProfileButton = true;
  showUploadCoverButton = false;
  showUploadProfileButton = false;
  hideProfileImage = false;
  openDetails = false;
  openConnections = false;
  openCreatePost = true;
  openFollowers = false;

  myPosts = true;
  connect = false;
  details = false;

  constructor(
    private server: RequestService,
    private session: SessionService) { }

  ngOnInit() {
    this.server.get('USERS_ID', { key: 'id', value: this.session.getUser()['_id'] })
      .subscribe((getName: Response) => {
        if (getName.status >= 200 && getName.status < 300 && getName.data) {
          this.name = getName.data.user.firstname,
            this.surname = getName.data.user.lastname
        }
      });
  }


  onSelectCoverFile(event) {
    this.hideUploadCoverButton = false;
    this.showUploadCoverButton = true;
    this.hideCoverImage = true;


    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        // this.urlCover = event.target.result;
      }
    }
  }

  onSelectProfileFile(event) {
    this.showUploadProfileButton = true;
    this.hideUploadProfileButton = false;
    this.hideProfileImage = true;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        // this.urlProfile = event.target.result;
      }
    }
  }

  openDetailsButton() {
    this.openConnections = false;
    this.openDetails = true;
    this.myPosts = false;
    this.openCreatePost = false;
    this.details = true;
    this.connect = false;

  }
  openConnectionsButton() {
    this.connect = true;
    this.myPosts = false;
    this.openCreatePost = false;
    this.openConnections = true;
    this.openDetails = false;
    this.details = false;
  }

  openMyPostsButton() {
    this.myPosts = true;
    this.connect = false;
    this.openCreatePost = true;
    this.openConnections = false;
    this.details = false;
    this.openDetails = false;
  }
  openFollowersButton() {
    this.openFollowers = true;
  }

}
