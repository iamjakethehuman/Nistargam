import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){}
  username: any = localStorage.getItem('username')
  title = 'nistargam';
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.reload()
  }
  goToProfile(){
    this.router.navigate([`/profile/${localStorage.getItem('username')}`])
    
  }
  goToSearch(){
    this.router.navigate(['/search'])
  }
}
