import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditComponent } from './edit/edit.component';
import { LikesComponent } from './likes/likes.component';
import { SearchComponent } from './search/search.component'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'details/:id',
    component: PostDetailsComponent
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'likes',
    component: LikesComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    CreateComponent,
    PostDetailsComponent,
    ProfilePageComponent,
    EditComponent,
    LikesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
