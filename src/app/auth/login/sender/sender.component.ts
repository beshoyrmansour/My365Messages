import { message } from './../../../shared/models/meesage.model';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
  loginForm: FormGroup = new FormBuilder().group({
    'senderEmail': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{8,20}')]),
  });
  showForgetPassword: boolean;
  ShowInvalidEmail: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }
  onLogin() {
    this.authService.login(this.loginForm.controls.senderEmail.value, this.loginForm.controls.password.value).then(() => {
      this.router.navigate(['/user'])
    }).catch((err) => {
      console.log(err);
      this.showForgetPassword = true;
      this.ShowInvalidEmail = true;
      alert('Invalid login : ' + err.message)
    })
  }
  gotoForgetPassword() {
    if (this.loginForm.controls.senderEmail.value) {
      let user = this.authService.loadForgetPassword(this.loginForm.controls.senderEmail.value).then((user) => {
        this.router.navigate(['/auth/forgetPassword'])
        console.log(user);
        console.log('security Question : ', user[0]['securityQuestion'], 'securityAnswer : ', user[0]['securityAnswer']);
      }).catch((err) => {
        alert(err);
      })

    } else {
      this.ShowInvalidEmail = true;
    }
  }
  changePassword(){
    this.authService.changePassword('1234567890')
  }
}
