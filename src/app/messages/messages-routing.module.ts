import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMessageComponent } from './view-message/view-message.component';

const routes: Routes = [
  { path: '', redirectTo: ':passCode', pathMatch: 'full' },
  { path: ':passCode', component: ViewMessageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
