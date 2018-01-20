import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { EditComponent } from './edit/edit.component';
import { ControlMessageComponent } from './control-message/control-message.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UserService],
  declarations: [UserComponent, EditComponent, ControlMessageComponent]
})
export class UserModule { }

