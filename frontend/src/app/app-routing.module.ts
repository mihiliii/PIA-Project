import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdministrationComponent } from './administration/administration.component';

const routes: Routes = [
    {path: "", component: LoginComponent, data: {userType: ''}},
    {path: "register", component: RegisterComponent},
    {path: "administration", component: AdministrationComponent},
    {path: "menadzer", component: LoginComponent, data: {userType: 'menadzer'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
