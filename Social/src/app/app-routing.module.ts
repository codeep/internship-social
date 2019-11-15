import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { UserComponent } from './components/user/user.component';
import { FeedComponent } from './views/feed/feed.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { CheckTokenGuard } from './check-token.guard';
import { GuestGuardGuard } from './guest-guard.guard';


const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[GuestGuardGuard]},  
  {path:'register',component:RegisterComponent,canActivate:[GuestGuardGuard]},
  {path:'wisard/details',component:DetailsComponent,canActivate:[CheckTokenGuard]},
  {path:'wisard/users',component:UserComponent,canActivate:[CheckTokenGuard]},
  {path:'feed',component:FeedComponent,canActivate:[CheckTokenGuard]},
  {path:'profile/:id',component:ProfilePageComponent,canActivate:[CheckTokenGuard]},
  {path:'profile/me',component:ProfilePageComponent,canActivate:[CheckTokenGuard]},
  {path:'',component:LoginComponent,canActivate:[GuestGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
