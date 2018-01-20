import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { user } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData: user;
  backgrounds = []
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,

  ) { }
  private EditUserForm = new FormBuilder().group({
    'senderName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^([a-zA-Z0-9 ]){5,20}')]),
    'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]),
    'senderEmail': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.email]),
    'receiverName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^([a-zA-Z0-9 ]){5,20}')]),
    'passCode': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{5,20}')]),
  });;
  ngOnInit() {
    this.userData = this.userService.getuserData();
    console.log(this.userData);

    // this.EditUserForm.controls.senderName.value(this.userData.senderName)
    this.EditUserForm.setValue({
      'senderName': this.userData.senderName,
      'username': this.userData.username,
      'senderEmail': this.userData.email,
      'receiverName': this.userData.receiverName,
      'passCode': this.userData.passCode
    });
    this.getBackgrounds();
  }

  gotochangePassword() {
    this.router.navigate(['/auth/forgetPassword'])
  }
  onSvaeEdit() {

  }

  getBackgrounds() {
    this.userService.getBackgrounds().subscribe(userBackgrounds => {
      this.backgrounds = userBackgrounds;
    })
  }

  uploadFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.userService.postBackgrounds(file).then(() => {
        this.getBackgrounds();
      })
    }
  }
  deletBackground(id) {
    console.log(id);
    this.userService.deletBackground(id).then(() => {
      // this.getBackgrounds();
      this.backgrounds = this.userService.userBackgrounds
    })
  }
}
