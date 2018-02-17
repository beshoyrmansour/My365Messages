import { message } from './../../shared/models/meesage.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../user.service';
import { user } from '../../shared/models/user.model';

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.css']
})
export class ControlMessageComponent implements OnInit {
  userMessages: message[];
  senderData: user;
  senderName: string;
  private msgCounter = 0;
  private snap = '';
  private messages: any[] = [{ content: '', viewDate: 0 }];
  private spinner = false;
  date: Date;
  private messageForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.messageForm = this.formBuilder.group({
      'messageField': new FormControl('asdsadsad', Validators.required),
      'messages': new FormArray([])
    });
  }

  ngOnInit() {
    this.userMessages = this.userService.getUserMessages();
    console.log(this.userMessages);
    this.senderData = this.userService.userData;
    this.senderName = this.senderData.senderName;
    this.spinner = false;
    // this.messageForm = this.formBuilder.group({
    //   'messageField': new FormControl('', Validators.required),
    //   'messages': new FormArray([])
    // });
  }

  onDeleteMessage(messageIndex) {

  }

  onEditMessage(newContent, messageIndex) {

  }

  addNewMessage() {
    let newMessage: message = {
      content: this.messageForm.controls.messageField.value,
      creationDate: Date.now(),
      viewDate: 0,
      // sender: this.senderData.id,
    }
    console.log(newMessage);
    console.log(' this.userMessages before: ', this.userMessages);
    this.userMessages.map((element) => {
      if (element.id) { delete element.id }
    })
    console.log(' this.userMessages : ', this.userMessages);

    this.userMessages.push(newMessage);
    // this.userService.saveMessages(this.userMessages).then(() => {
    // });
  }

}
0