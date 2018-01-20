import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  securityQuestion: string = '';
  securityAnswer: string = '';
  matchAnswer: boolean;
  missCounter: number = 0;
  maxMistakes = 3;
  securityQuestionForm: FormGroup = new FormBuilder().group({
    'securityQuestion': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    'securityAnswer': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
  });
  newPasswordForm: FormGroup = new FormBuilder().group({
    'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{8,20}')]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{8,20}')]),
  });
  sendEmailForm: FormGroup = new FormBuilder().group({
    'senderEmail': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email]),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log('ForgetPasswordComponent is Fired');
    this.securityQuestion = this.authService.securityQuestion;
    this.securityAnswer = this.authService.securityAnswer;
  }
  onCheckAnswer() {

    if (this.securityAnswer === this.securityQuestionForm.controls.securityAnswer.value) {
      this.matchAnswer = true;

    } else {
      this.matchAnswer = false;
      if (this.missCounter < this.maxMistakes) {
        this.missCounter++;
        if (this.missCounter === 3) {
          alert("Security violation \n You have exhausted all your attempts. \n This account is temporarily locked ")
        } else {
          alert("Answer didn't match \n you have only " + (this.maxMistakes - this.missCounter) + " times to try. \n BE CAREFUL")
        }
      } else {
        alert("This account is temporarily locked please check your email to know your temporary password")
      }
    }
  }
  matchonPassword() {
    return (this.newPasswordForm.controls.password.value === this.newPasswordForm.controls.confirmPassword.value) && (this.newPasswordForm.controls.password.value && this.newPasswordForm.controls.confirmPassword.value)
  }
  onSaveEdit() {
    console.log(this.newPasswordForm.controls.confirmPassword.value)
    console.log(this.newPasswordForm.controls.password.value)
    if (this.matchonPassword()) {
      this.authService.changePassword(this.newPasswordForm.controls.password.value)
    } else {

    }
  }
  sendEmail(){
    if(this.sendEmailForm.controls.senderEmail.value && this.sendEmailForm.controls.senderEmail.valid)
    this.authService.changePassword(this.sendEmailForm.controls.senderEmail.value)
  }
}