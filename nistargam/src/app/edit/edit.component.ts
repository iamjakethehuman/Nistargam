import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: any | any
  isDataLoaded : boolean | any
  registrationForm: FormGroup | any

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.service.isNotLogged()
    this.sendForEdit()
  }

  newPfp : boolean = false
  selectedFile : File | any

  sendForEdit(){
    this.service.sendEditInfo({token: localStorage.getItem('token')}).subscribe((res ) => { 
      console.warn(res)
      this.user = res
      this.isDataLoaded = true
    })
  }
  submitEditData(data: any){
    const fd = new FormData()
    fd.set('token', localStorage.getItem('token') || 'nothing')
    fd.set('username', data.username)
    fd.set('email', data.email)
    fd.set('bio', data.bio)
    
    
    if (this.newPfp == true){
      fd.set('img', this.selectedFile)
      fd.set('newPfp', 'true')
    }
    else {
      fd.set('newPfp', 'false')
    }
    

    this.service.sendFinalEditData(fd).subscribe((res) => { 
      console.warn(res)
      localStorage.setItem('token', res.token)
      localStorage.setItem('username', res.username)
      this.router.navigate([`/profile/${res.username}`])
    })
  }
  loadName(event: any){
    console.log(event.target)
    event.target.value = 'tes'
  }
  onFileSelected(event : any){
    this.newPfp = true;
    this.selectedFile = <File>event.target.files[0]
  }
  

}
