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
  
  user: any | undefined
  posts: any | undefined
  isUser: boolean | undefined
  username: any | undefined

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
  }
  checkIfUser(){
    const data = {
      token: localStorage.getItem('token'),
      username: this.username
    }
    this.service.checkIfUser(data).subscribe((res: any) => { 
      console.log(res)
      this.isUser = res
    })
  }
  

}
