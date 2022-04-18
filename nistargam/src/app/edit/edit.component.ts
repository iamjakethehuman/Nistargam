import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: any | undefined

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.sendForEdit()
  }

  sendForEdit(){
    this.service.sendEditInfo({token: localStorage.getItem('token')}).subscribe((res ) => { 
      console.warn(res)
      this.user = res
    })
  }
  submitEditData(data: any){
    const send = { 
      token: localStorage.getItem('token'),
      username: data.username,
      pfp: data.imgUrl
    }
    this.service.sendFinalEditData(send).subscribe((res) => { 
      console.warn(res)
    })
  }

}
