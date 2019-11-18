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
  user:any;
  constructor(
    private fb: FormBuilder,
    private myServer: RequestService
    ) { 
  }

  ngOnInit() {
        
  }
  onKey(event){
    if(this.searchForm.value.text !== ""){
      this.myServer.get('USERS',null,[{key:'search', value: this.searchForm.value.text}]).subscribe(data =>
        this.user = data
      )
    }else{
      this.user = null
    }
    
  }

}
