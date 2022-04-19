import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post/post';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  registerUser(data: any){
    return this.http.post<any>('/api/register', data)
  }
  loginUser(data: any){             // TO DO: CREATE INTERFACES
    return this.http.post<any>('/api/login', data)
  }
  createPost(data:any, token:any){
    return this.http.post<any>('/api/create', {data, token})
  }
  getPostById(id: string, data: any){
    return this.http.post<any>(`api/details/${id}`, data)
  }
  getUserByUsername(username: string){
    return this.http.get<any>(`api/profile/${username}`)
  }
  followUser(data: any){
    return this.http.post<any>('/api/follow', data)
  }
  unfollowUser(data: any){
    return this.http.post<any>('/api/unfollow', data)
  }
  getHomePostsByToken(data: any){ 
    return this.http.post<any>('/api/home', data)
  }
  submitCommentToPost(data: any){ 
    return this.http.post<any>('/api/comment', data)
  }
  checkIfUser(data:any){
    return this.http.post<any>('/api/checkOwnership', data)
  }
  sendEditInfo(data:any){
    return this.http.post<any>('/api/editProfile', data)
  }
  sendFinalEditData(data: any){ 
    return this.http.post<any>('/api/editProfileInfo', data)
  }
  submitLike(data: any){
    return this.http.post<any>('/api/submitLike', data)
  }
  removeLike(data: any){
    return this.http.post<any>('/api/removeLike', data)
  }
  getLikes(data: any){
    return this.http.post<any>('/api/likes', data)
  }
}
