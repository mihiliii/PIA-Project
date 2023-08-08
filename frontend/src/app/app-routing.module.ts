import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdministrationComponent } from './administration/administration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilComponent } from './pacijent/profil/profil.component';

const routes: Routes = [
    {path: "", title:'Glavna', component: HomepageComponent,},
    {path: "login", component: LoginComponent, data: {userType: ''}},
    {path: "register", component: RegisterComponent},
    {path: "administration", component: AdministrationComponent},
    {path: "menadzer", component: LoginComponent, data: {userType: 'menadzer'}},
    {path: "pacijent", component: ProfilComponent},
    {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
