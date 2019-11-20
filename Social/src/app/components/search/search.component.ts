import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { RequestService } from 'src/app/services/request-service.service';
import  "../../endpoints"
import { SessionService } from 'src/app/services/session.service';
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
  id:number
  constructor(
    private fb: FormBuilder,
    private myServer: RequestService,
    private sessionService: SessionService
    ) { 
  }

  ngOnInit() {        
  }
  
  onKey(event){
    if(this.searchForm.value.text !== ""){
      this.myServer.get('USERS',null,[{key:'search', value: this.searchForm.value.text}]).subscribe(data =>
        this.user = data["data"]        
      )
    }else{
      this.user = null
    }
    
  }

  sendId(data){
    this.sessionService.setGuestID(data);
  }

}
