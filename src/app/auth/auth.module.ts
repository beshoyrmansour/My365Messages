import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SenderComponent } from './login/sender/sender.component';
import { ReceiverComponent } from './login/receiver/receiver.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot()
    ],
  declarations: [LoginComponent, RegisterComponent, SenderComponent, ReceiverComponent, ForgetPasswordComponent]
})
export class AuthModule { }
