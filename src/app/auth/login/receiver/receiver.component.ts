import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  gotoTodayMessages() {
    this.router.navigate(['/messages/123'])
  }

}
