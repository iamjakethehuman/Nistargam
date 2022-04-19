import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AppService, private router: Router) { }

  posts : any | undefined
  arePosts : boolean | undefined

  ngOnInit(): void {
    this.getHomePosts()
    if (this.posts == []){this.arePosts = false}
    else {this.arePosts = true}
  }

  getHomePosts(){
    console.log(localStorage.getItem('token'))
    this.service.getHomePostsByToken({token: localStorage.getItem('token')}).subscribe((result: any) => { 
      console.warn(result)
      this.posts = result
    })
  }

  submitComment(data:any, id: any): any{
    const send = { 
      token: localStorage.getItem('token'),
      postId: id,
      comment: data.comment
    }
    this.service.submitCommentToPost(send).subscribe((res) => { 
        
      console.log(res)
      this.postRedirect(id)
  })
  }

  postRedirect(data: any){
    
    this.router.navigate([`details/${data}`])

  }

  submitLike(id: any, number : any){
    console.log('clicked submitlike')
    this.service.submitLike({id: id, token: localStorage.getItem('token')}).subscribe((res) => { 
      console.warn(res)
      this.posts[number].hasLiked = true
    })
  }
  removeLike(id: any, number: any){
    console.log('clicked remove like')
    this.service.removeLike({id: id, token: localStorage.getItem('token')}).subscribe((res) => { 
      console.warn(res)
      this.posts[number].hasLiked = false
      //window.location.reload()
    })
  }

}
