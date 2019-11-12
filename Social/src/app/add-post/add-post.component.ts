import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor() { }
  @Input()
  inset: boolean;
  ngOnInit() {
  }

}
