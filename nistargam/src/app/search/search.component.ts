import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: AppService) { }
  users: any | any
  ngOnInit(): void {
  }

  search(event: any){
    const param = event.target.value
    console.log(param)
    // if (param.length > 2){
    this.service.searchUsers({param: param}).subscribe((res) => { 
      this.users = res.users
      console.log(res)
     })
  // }
  //else {alert('Type at least 3 symbols')}
 }

}
