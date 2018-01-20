import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
const routes: Routes = [
  {path:'', redirectTo: 'auth', pathMatch: 'full'},
  {path : 'auth' , loadChildren: 'app/auth/auth.module#AuthModule' },
  {path : 'messages' , loadChildren: 'app/messages/messages.module#MessagesModule' },
  {path : 'user' , loadChildren: 'app/user/user.module#UserModule', canLoad:[AuthGuard], canDeactivate:[AuthGuard] },
  {path : '*' , loadChildren: 'app/auth/auth.module#AuthModule' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
