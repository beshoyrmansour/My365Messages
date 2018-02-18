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
      'messageField': new FormControl('', Validators.required),
      'messages': this.formBuilder.array([
        this.formBuilder.group({
          'content': ''
        })
      ])
    });
  }

  ngOnInit() {
    this.userService.getUserMessages().subscribe((messages: message[]) => {
      this.userMessages = messages;
      console.log(this.userMessages);
      this.senderData = this.userService.userData;
      this.senderName = this.senderData.senderName;
      this.spinner = false;
      this.msgCounter = this.userMessages.length;

      for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
      }
    });
  }

  onDeleteMessage(messageId) {
    console.log('messageId', messageId);
    this.userService.deleteMessage(messageId).then((res) => {
      console.log('res', res);
    }).catch((err) => {
      console.error('err', err);
    });
  }

  onEditMessage(newContent, messageIndex) {
    this.userService.editMessage(newContent, messageIndex);
    // .then((res) => {
    //   console.log('res', res);
    // }).catch((err) => {
    //   console.error('err', err);
    // });
  }

  addNewMessage() {
    let newMessage: message = {
      content: this.messageForm.controls.messageField.value,
      creationDate: Date.now(),
      viewDate: 0,
      sender: this.senderData.id
    }
    console.log('newMessage', newMessage);
    console.log(' this.userMessages before: ', this.userMessages);
    this.userMessages.map((element) => {
      if (element.id) { delete element.id }
    })
    this.userService.saveMessages(newMessage).then((res) => {
      console.log('res', res);

    }).catch((err) => {
      console.error('err', err);
    });
  }

}
