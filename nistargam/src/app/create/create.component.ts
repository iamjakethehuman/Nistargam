import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: AppService) { 
    
  }
  selectedFile : File | any
  ngOnInit(): void {
  }

  createPost(data:any){
    let fd = new FormData()
    
    fd.set("img", this.selectedFile)
    fd.set('title', data.title)
    fd.set('imgUrl', data.imgUrl)
    console.log(fd.get('img'))
    const token = localStorage.getItem('token')
    fd.set('token', token || 'nothing')
    this.service.createPost(fd).subscribe((res) => { 
      console.warn(res)
    })
    
  }

  

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    console.log(event.target.files[0])
  }

}
