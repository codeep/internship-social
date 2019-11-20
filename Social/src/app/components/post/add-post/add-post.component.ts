import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RequestService } from 'src/app/services/request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.css"]
})
export class AddPostComponent implements OnInit {
  postList = {title:'', content:'', file:''};
  title:string;
  textArea: string;
  linkText: string;
  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private  request: RequestService,
    private  session: SessionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [""]
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("profile").setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.uploadForm.get("profile").value);
    this.linkify(this.textArea);
    this.postList.title = this.title;
    this.postList.content = this.textArea;
    this.postList.file = this.uploadForm.value.profile.name;  
    console.log(this.postList)
    this.request.post('POSTS', this.postList).subscribe(post=>console.log(post,"sub"))
    this.toastr.success("Your post is created")
  }
  
  linkify(plainText) {
    let replacedText;
    let replacePattern1;
    let replacePattern2;
    let replacePattern3;

    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = plainText.replace(
      replacePattern1,
      '<a href="$1" target="_blank">$1</a>'
    );
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(
      replacePattern2,
      '$1<a href="http://$2" target="_blank">$2</a>'
    );
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(
      replacePattern3,
      '<a href="mailto:$1">$1</a>'
    );
    this.linkText = replacedText;
  }
}
