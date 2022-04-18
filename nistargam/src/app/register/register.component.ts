import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit(): void {
  }


  submitRegisterData(data:any){
    this.service.registerUser(data).subscribe((res) => {
      localStorage.setItem('token', res.token)
    })
  }
}
