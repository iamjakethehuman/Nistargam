import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit(): void {
  }

  createPost(data:any){
    
    const token = localStorage.getItem('token')
    this.service.createPost(data, token).subscribe((res) => { 
      console.warn(res)
    })
    
  }

}
