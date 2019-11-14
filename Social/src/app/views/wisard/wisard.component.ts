import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wisard',
  templateUrl: './wisard.component.html',
  styleUrls: ['./wisard.component.css']
})
export class WisardComponent implements OnInit {
 arr=[1,2,3, 1,2,3];
  constructor() { }

  ngOnInit() {
  }

}
