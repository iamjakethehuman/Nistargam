import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged()
  }


  submitRegisterData(data:any){
    this.service.registerUser(data).subscribe((res) => {
      localStorage.setItem('token', res.token)
    })
  }
  isLogged(){
    if (localStorage.getItem('token') != undefined) {this.router.navigate(['/home'])}
  }
}
