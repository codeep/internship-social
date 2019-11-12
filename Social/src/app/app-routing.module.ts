import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ConfirmComponent } from './views/confirm/confirm.component';
import { RecoverComponent } from './views/recover/recover.component';
import { DetailsComponent } from './components/details/details.component';
import { UserComponent } from './components/user/user.component';
import { FeedComponent } from './views/feed/feed.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'confirm',component:ConfirmComponent},
  {path:'recover',component:RecoverComponent},
  {path:'wisard/details',component:DetailsComponent},
  {path:'wisard/users',component:UserComponent},
  {path:'feed',component:FeedComponent},
  {path:'profile/:id',component:ProfilePageComponent},
  {path:'profile/me',component:ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
