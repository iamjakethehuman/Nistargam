import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit(): void {
  }

  submitLoginData(data:any){
    this.service.loginUser(data).subscribe((res)=> { 
      if (res.token) {localStorage.setItem('token', res.token)}
      
    })
  }

}
