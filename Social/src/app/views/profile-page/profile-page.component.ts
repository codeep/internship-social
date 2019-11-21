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
  imgURL;
  urlProfile;
  hideUploadCoverButton = true;
  hideUploadProfileButton = true;
  showUploadCoverButton = false;
  showUploadProfileButton = false;
  hideProfileImage = false;
  openDetails = false;
  openConnections = false;
  openCreatePost = true;
  openEdit = false;
  name;
  surname;
  posts = [];
  offset = 0;
  openMy = false;
  followingArray;
  followersArray;
  followingsUser = [];
  followersUser = [];
  following;
  followers = false;
  showPosts = true;
  public imagePath;
  constructor(
    private server: RequestService,
    private session: SessionService) { }
  ngOnInit() {
    this.server.get('WALL', { key: 'id', value: this.session.getGuestID() }, [{ key: 'limit', value: 10 }, { key: 'offset', value: 0 }])
      .subscribe((posts: { data: [] }) => {
        this.posts = posts.data,
          this.offset++
      });
    this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID() })
      .subscribe((getName: Response) => {
        if (getName.status >= 200 && getName.status < 300 && getName.data) {
          this.name = getName.data.user.firstname,
            this.surname = getName.data.user.lastname
        }
      });
    if (this.session.getUser()['_id'] == this.session.getGuestID()) {
      this.openEdit = true;
      this.openMy = true;
    }
    else {
      this.openCreatePost = false;
    }
  }
  @HostListener("window:scroll", ["$event"])
  onScroll() {
    let scrollHeight;
    let totalHeight;
    scrollHeight = document.body.scrollHeight;
    totalHeight = window.scrollY + window.innerHeight;
    if (totalHeight >= scrollHeight) {
      this.server.get('WALL', { key: 'id', value: this.session.getGuestID() }, [{ key: 'limit', value: 10 }, { key: 'offset', value: this.offset }])
        .subscribe((posts: { data: [] }) => {
          this.posts.concat(posts.data)
          this.offset++
        });
    }
  }
  coverPhoto(files) {
    if (files.length === 0)
      return;
    this.hideUploadCoverButton = false;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  profilePhoto(files) {
    if (files.length === 0)
      return;
    this.hideUploadProfileButton = false;
    this.hideProfileImage = true;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.urlProfile = reader.result;
    }
  }
  openDetailsButton() {
    this.openConnections = false;
    this.openDetails = true;
    this.openCreatePost = false;
    this.showPosts = false;
    this.following = false;
  }
  openConnectionsButton() {
    this.showPosts = false;
    this.openCreatePost = false;
    this.openConnections = true;
    this.openDetails = false;
    this.following = true;
    this.followingsUser = [];

    this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID() })
      .subscribe((getFollowings: Response) => {
        if (getFollowings.status >= 200 && getFollowings.status < 300) {
          this.followingArray = getFollowings.data.user.followings;
          this.followingArray.forEach(id => {
            this.server.get('USERS_ID', { key: 'id', value: id })
              .subscribe((data: Response) => {
                this.followingsUser.push(data.data.user);
              })
          });
        }
      });
  }
  openMyPostsButton() {
    if (this.session.getUser()['_id'] == this.session.getGuestID()) {
      this.openCreatePost = true;
    } else {
      this.openCreatePost = false;
    }
    this.following = false;
    this.showPosts = true;
    this.openConnections = false;
    this.openDetails = false;
  }
  openFollowingButton() {
    this.followingsUser = [];
    this.following = true;
    this.followers = false;
    this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID() })
      .subscribe((getFollowings: Response) => {
        if (getFollowings.status >= 200 && getFollowings.status < 300) {
          this.followingArray = getFollowings.data.user.followings;
          this.followingArray.forEach(id => {
            this.server.get('USERS_ID', { key: 'id', value: id })
              .subscribe((data: Response) => {
                this.followingsUser.push(data.data.user);
              })
          });
        }
      });
  }
  openFollowersButton() {
    this.followersUser = [];
    this.following = false;
    this.followers = true;

    this.server.get('USERS_ID', { key: 'id', value: this.session.getGuestID() })
      .subscribe((getFollowers: Response) => {
        if (getFollowers.status >= 200 && getFollowers.status < 300) {
          this.followersArray = getFollowers.data.user.followers;
          this.followersArray.forEach(id => {
            this.server.get('USERS_ID', { key: 'id', value: id })
              .subscribe((data: Response) => {
                this.followingsUser.push(data.data.user);
              })
          });
        }
      });
  }
}
