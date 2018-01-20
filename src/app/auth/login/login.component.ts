import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myNofiation: Notification;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/user'])
    }
  }
  gotoSignUp() {
    this.router.navigate(['/auth/register'])
  }

  Notify() {
    let nofifyOptions: object = {
      actions: [],
      body: "this is what shows in the notifaction body",
      data: null,
      dir: "rtl",
      icon: "assets/MY356MSG.png",
      image: "https://blog.emojipedia.org/content/images/2016/04/emojipedia-colbert-emoji-sample.png",
      lang: "",
      onclick: () => { },
      onclose: () => { },
      onerror: () => { },
      onshow: () => { },
      renotify: false,
      requireInteraction: false,
      silent: false,
      tag: "uniqeTag1",
      timestamp: 1514567687958,
      title: "",
      vibrate: [],
    }
    this.myNofiation = new Notification('show this Message 👍', nofifyOptions)

    if (Notification['permission'] === "granted") {
      console.log(this.myNofiation);

    } else {
      console.log(Notification['permission']);
      Notification.requestPermission();
      console.log(Notification['permission']);
    }
  }

}
