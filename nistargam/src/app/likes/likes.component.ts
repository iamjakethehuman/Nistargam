import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getRecentLikes()
  }

  likes: any | any

  getRecentLikes(){
    console.log('works')
    const token = localStorage.getItem('token')
    console.log(token)
    this.service.getLikes({token: token}).subscribe((res) => { 
      console.warn(res)
      this.likes = res
    })
  }

}
