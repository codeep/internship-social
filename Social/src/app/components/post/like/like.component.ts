import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  votesCount=0;

  constructor() { }
  toggleEditable(event) {
    if ( event.target.checked ) {
       this.votesCount++;
   }else{
     this.votesCount--;
   }
}

  ngOnInit() {
  }


}


