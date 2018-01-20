import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { message } from './../shared/models/meesage.model';
import { user } from '../shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userMessages: message[];
  userData: user;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  gotoEditUser() {
    this.router.navigate(['/user/edit'])
  }
  onShowMessageAsReceiver() {
    this.router.navigate(['messages/123'])
  }
  gotoMessageControl() {
    this.router.navigate(['/user/messages'])
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }
  test() {
    this.userService.getBackgrounds();
  }
}
