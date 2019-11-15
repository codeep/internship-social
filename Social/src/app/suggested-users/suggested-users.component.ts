import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request-service.service';

@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.component.html',
  styleUrls: ['./suggested-users.component.css']
})
export class SuggestedUsersComponent implements OnInit {

  constructor(private myService:RequestService) { }

  ngOnInit() {
  }

}
