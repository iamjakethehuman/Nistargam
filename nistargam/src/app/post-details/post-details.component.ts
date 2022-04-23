import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Post } from '../post/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: AppService) { }

  post: Post | any
  user: any | any
  id: any | any
  comments: any | any
  user2: any | any

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    this.post = this.getPost(idFromRoute)
    this.id = idFromRoute
    this.service.isNotLogged()
  }

  getPost(id:any): any{
    this.service.getPostById(id, {token: localStorage.getItem('token')}).subscribe((res) => { 
        
        console.log(res)
        this.post = res.post
        this.user = res.user
        this.user2 = res.user2
        return res
    })
  }
  submitComment(data:any): any{
    const send = { 
      token: localStorage.getItem('token'),
      postId: this.id,
      comment: data.comment
    }
    this.service.submitCommentToPost(send).subscribe((res) => { 
        
      console.log(res)
      window.location.reload()
  })
  }

  submitLike(){
    console.log('clicked submitlike')
    this.service.submitLike({id: this.id, token: localStorage.getItem('token')}).subscribe((res) => { 
      console.warn(res)
      window.location.reload()
    })
  }
  removeLike(){
    console.log('clicked remove like')
    this.service.removeLike({id: this.id, token: localStorage.getItem('token')}).subscribe((res) => { 
      console.warn(res)
      window.location.reload()
    })
  }
  
}
