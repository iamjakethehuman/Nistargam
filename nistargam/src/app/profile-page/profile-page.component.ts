import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: AppService) { }
  
  user: any | any
  posts: any | any
  isUser: boolean | any
  following: boolean | any
  username: any | any

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.getUser(username)
    this.username = username
    this.checkIfUser()
    
  }

  getUser(username: any): any{
    this.service.getUserByUsername(username).subscribe((res)=> { 
      console.warn(res)
      this.user = res.user
      this.posts = res.posts
      console.log(this.posts)
      return res
    })
  }
  follow(id: any){
    const data = {
      id,
      token: localStorage.getItem('token')
    }
    console.log('works')
    this.service.followUser(data).subscribe((res) => { 
      console.warn(res)
    })
    window.location.reload()
  }
  unfollow(id: any){
    const data = {
      id,
      token: localStorage.getItem('token')
    }
    console.log('unfollowed')
    this.service.unfollowUser(data).subscribe((res) => { 
      console.warn(res)
    })
    window.location.reload()
  }
  checkIfUser(){
    const data = {
      token: localStorage.getItem('token'),
      username: this.username
    }
    this.service.checkIfUser(data).subscribe((res: any) => { 
      console.log(res)
      this.isUser = res.ownership
      this.following = res.following
    })
  }
  

}
