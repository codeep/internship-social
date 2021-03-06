import { Component, OnInit, Output, EventEmitter } from "@angular/core";
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
  postList = { title: '', content: '', file: '' };
  title: string;
  textArea: string;
  linkText: string;
  uploadForm: FormGroup;
  public imagePath;
  imgURL: any;
  file: string;
  @Output() emitter: any = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    private session: SessionService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [""]
    });
  }
  onFileSelect(files) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.file = this.imgURL;
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.uploadForm.get("profile").value);
    this.linkify(this.textArea);
    this.postList.title = this.title;
    this.postList.content = this.textArea;
    this.postList.file = this.file;
    this.request.post('POSTS', this.postList).subscribe(res => {
    
      this.toastr.success("Your post is created");
      this.title = "";
      this.textArea = '';
      this.file = "";
      this.imgURL = '';
      this.postList['_id'] = res['data']['_id']; 
      this.emitter.emit(this.postList);
      delete this.postList['_id'];
    })


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
    this.textArea = replacedText;
  }
}
