import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './authentication/register/register.component';
import { AdministrationComponent } from './administration/administration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilComponent } from './pacijent/profil/profil.component';
import { LekariComponent } from './pacijent/lekari/lekari.component';
import { TabelaLekaraComponent } from './tabela-lekara/tabela-lekara.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdministrationComponent,
    HomepageComponent,
    ProfilComponent,
    LekariComponent,
    TabelaLekaraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
