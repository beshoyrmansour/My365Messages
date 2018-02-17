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
  uploading: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }
  private EditUserForm = new FormBuilder().group({
    'senderName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^([a-zA-Z0-9 ]){5,20}')]),
    'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]),
    'senderEmail': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.email]),
    'receiverName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^([a-zA-Z0-9 ]){5,20}')]),
    'passCode': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{5,20}')]),
  });
  
  ngOnInit() {
    this.userData = this.userService.userData;
    this.EditUserForm.setValue({
      'senderName': this.userData.senderName,
      'username': this.userData.username,
      'senderEmail': this.userData.email,
      'receiverName': this.userData.receiverName,
      'passCode': this.userData.passCode
    });
    this.getBackgrounds();
    console.log(this.EditUserForm);

  }

  gotochangePassword() {
    this.router.navigate(['/auth/forgetPassword'])
  }
  onSvaeEdit() {
    if (this.EditUserForm.valid) {
      this.userData = {
        'id': this.userData.id,
        'senderName': this.EditUserForm.controls.senderName.value,
        'username': this.EditUserForm.controls.username.value,
        'email': this.EditUserForm.controls.senderEmail.value,
        'receiverName': this.EditUserForm.controls.receiverName.value,
        'passCode': this.EditUserForm.controls.passCode.value,
        'securityQuestion': this.userData.securityQuestion,
        'securityAnswer': this.userData.securityAnswer,
        'userBackgrounds': this.userData.userBackgrounds
      };
      this.userService.userData = this.userData;
      this.userService.updateUserData().then(() => {
        alert('User data updated successfully');
        this.router.navigate(['/user'])
      }).catch((err) => {
        alert('something went wrong while updating user data ,Error : ' + err)
        this.router.navigate(['/'])
      })
      alert('Invalid form');
    }
  }

  getBackgrounds() {
    this.userService.getBackgrounds().subscribe(userBackgrounds => {
      this.backgrounds = userBackgrounds;
    }).unsubscribe();
  }

  uploadFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.uploading = true;
      this.userService.postBackgrounds(file).then(() => {
        this.uploading = false;
        this.getBackgrounds();
      })
    }
  }

  deletBackground(id) {
    if (this.EditUserForm.valid) {
      this.userService.deletBackground(id).then(() => {
        this.backgrounds = this.userService.userBackgrounds;
      })
    } else {
      alert('Invalid Form')
    }
  }
}
