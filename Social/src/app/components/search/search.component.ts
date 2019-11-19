import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { RequestService } from 'src/app/services/request-service.service';
import  "../../endpoints"
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm= this.fb.group({   
    text:['']
  })
  constructor(
    private fb: FormBuilder,
    private myServer: RequestService
    ) { 
  }

  ngOnInit() {
    
  }
  onKey(event){

  }

}
