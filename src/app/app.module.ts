import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { ToastrModule } from 'ngx-toastr';

import { AddPostComponent } from './components/post/add-post/add-post.component';
import { AddedPostComponent } from './components/post/added-post/added-post.component';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

import { FeedComponent } from './views/feed/feed.component';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './components/search/search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { WisardComponent } from './views/wisard/wisard.component';
import { LikeComponent } from './components/post/like/like.component';
import { UserComponent } from './components/user/user.component';
import { DetailsComponent } from './components/details/details.component';
import { MatCardModule } from '@angular/material/card';
import { SessionService } from './services/session.service';
import { SuggestedUsersComponent } from './suggested-users/suggested-users.component';
import { RequestService } from './services/request-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    AddPostComponent,
    AddedPostComponent,
    FeedComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    WisardComponent,
    LikeComponent,
    UserComponent,
    DetailsComponent,
    SuggestedUsersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    ToastrModule.forRoot()
  ],
  providers: [RequestService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
