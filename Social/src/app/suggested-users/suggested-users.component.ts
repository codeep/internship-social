import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request-service.service';
import { Response } from 'src/interfaces/response.interface';

@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.component.html',
  styleUrls: ['./suggested-users.component.css']
})
export class SuggestedUsersComponent implements OnInit {
  users =[]
  constructor(private myService:RequestService) { 
   myService.post('NEARBY',null,null)
    .subscribe((response: Response)=>{
      if(response.status >= 200 && response.status < 300 && response.data){
        this.users=response.data
        console.log(this.users,"123")
      }
    })
  }

  ngOnInit() {
  }

}
