import { MessagesService } from './messages.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { ViewMessageComponent } from './view-message/view-message.component';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  providers:[MessagesService],
  declarations: [ViewMessageComponent]
})
export class MessagesModule { }
