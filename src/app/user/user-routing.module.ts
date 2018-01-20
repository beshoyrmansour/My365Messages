import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlMessageComponent } from './control-message/control-message.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent , canActivate: [AuthGuard], pathMatch: 'full'},
  { path: 'edit', component: EditComponent },
  { path: 'messages', component: ControlMessageComponent , canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
