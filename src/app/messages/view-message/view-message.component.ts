import { message } from './../../shared/models/meesage.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  // private user: FirebaseListObservable<any[]>;
  private todayBg = '../../../assets/def-bg.svg';
  private passCode = 'passCode';
  private senderName = 'Sender Name';
  private receiverName = 'Receiver Name';
  private todayMessage = null;
  private messages: any[];
  private today = Date.now();
  private snap = '';
  private userMessages: message[]= [];
  spinner = false;  
  constructor() { }

  ngOnInit() {
  }

}
