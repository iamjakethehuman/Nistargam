import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLoginData(data:any){
    this.service.loginUser(data).subscribe((res)=> { 
      if (res.token) {localStorage.setItem('token', res.token); localStorage.setItem('username', res.username) ;this.router.navigate(['/home'])}
      else {window.alert('Incorrect data! Try again!')}
      
    })
  }

}
