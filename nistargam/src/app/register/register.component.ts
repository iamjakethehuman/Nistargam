import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: AppService, private router: Router) {

    this.regex = /.+@.+/g
  }

  ngOnInit(): void {
    this.isLogged()
  }
  regex: RegExp | any

  submitRegisterData(data: any) {
    if (this.regex.test(data.email) == false) {
      console.log(data.email)
      alert('invalid email')
    }
    else if (data.username.length < 4){
      alert('username must be at least 4 symbols')
    }
    else if (data.username.length > 20){
      alert(`username must be under 20 symbols`)
    }
    else if (data.password.length < 5){
    alert(`password must be at least 5 symbols`)
    }
    else if (data.password.length > 25){
      alert(`password must be under 25 symbols`)
    }
    else
    {
      this.service.registerUser(data).subscribe((res) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('username', res.username)
        this.router.navigate(['/home'])
      })
    }
  }
  isLogged() {
    if (localStorage.getItem('token') != undefined) { this.router.navigate(['/home']) }
  }
}
