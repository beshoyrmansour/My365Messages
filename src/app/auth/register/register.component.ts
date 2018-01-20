import { user } from './../../shared/models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators, ControlValueAccessor, FormArray, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterContentInit {
  newUser: user;
  private newUserForm: FormGroup = new FormBuilder().group({
    'senderName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^([a-zA-Z0-9 ]){5,20}')]),
    'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9_]{5,20}')]),
    'senderEmail': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email]),
    'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{8,20}')]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{8,20}')]),
    'securityQuestion': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    'securityAnswer': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    'receiverName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^([a-zA-Z0-9 ]){5,20}')]),
    'passCode': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]{5,20}')]),
  });
  isInvalidPassword: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // const CF: FormControl = new FormControl(this.newUserForm.controls['password']);
    console.log(this.newUserForm.controls.password.validator);
    this.isInvalidPassword = (this.newUserForm.controls.confirmPassword.touched && this.newUserForm.controls.password.touched)
      && ((this.newUserForm.controls.confirmPassword.value != this.newUserForm.controls.password.value))
  }
  ngAfterContentInit(): void {
  }
  validatePasswordMatch(control: FormControl): ValidationErrors | null {
    let confirmValue = this.newUserForm.controls['confirmPassword'].value;
    if ((<string>control.value) === (confirmValue)) {
      console.log('valid');
      return Observable.of(null);
    } else {
      console.log('invalid');
      return Observable.of('Your password and confirmation password do not match');
    }
  }
  onSignUp() {
    this.isInvalidPassword = !(this.newUserForm.controls.password.value === this.newUserForm.controls.confirmPassword.value);
    if (!this.isInvalidPassword && this.newUserForm.valid) {
      this.newUser = {
        'senderName': this.newUserForm.controls.senderName.value,
        'username': this.newUserForm.controls.username.value,
        'email': this.newUserForm.controls.senderEmail.value,
        'receiverName': this.newUserForm.controls.receiverName.value,
        'passCode': this.newUserForm.controls.passCode.value,
        'securityQuestion': this.newUserForm.controls.securityQuestion.value,
        'securityAnswer': this.newUserForm.controls.securityAnswer.value,
        'userBackgrounds': ['']
      };
      console.log('this.newUser', this.newUser);
      this.authService.signup(this.newUser, this.newUserForm.controls.password.value).then(() => {
        console.log('Register Component onSignUp Auth Service signup then is fired');
        this.router.navigate(['/user'])
      }).catch((err) => {
        console.log('Register Component onSignUp Auth Service signup catch Error : ' + err)
        this.router.navigate(['/'])
      })
    } else {
      // this.isInvalidPassword = true;

      console.log('Form is invalid');
    }


  }

}
