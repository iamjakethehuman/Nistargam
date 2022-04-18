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

  getRecentLikes(){
    console.log('works')
    this.service.getLikes(localStorage.getItem('token')).subscribe((res) => { 
      console.warn(res)
    })
  }

}
