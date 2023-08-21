import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PacijentProfilComponent } from './pacijent/pacijent-profil/pacijent-profil.component';
import { PacijentLekariComponent } from './pacijent/pacijent-lekari/pacijent-lekari.component';
import { TabelaLekaraComponent } from './display-components/tabela-lekara/tabela-lekara.component';
import { LekarProfilComponent } from './lekar/lekar-profil/lekar-profil.component';
import { PacijentPreglediComponent } from './pacijent/pacijent-pregledi/pacijent-pregledi.component';
import { NavbarComponent } from './display-components/navbar/navbar.component';
import { LekarPreglediComponent } from './lekar/lekar-pregledi/lekar-pregledi.component';
import { RaznoComponent } from './lekar/razno/razno.component';
import { MenadzerHomepageComponent } from './menadzer/menadzer-homepage/menadzer-homepage.component';
import { UserEditComponent } from './display-components/user-edit/user-edit.component';
import { NewLekarComponent } from './menadzer/components/new-lekar/new-lekar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    PacijentProfilComponent,
    PacijentLekariComponent,
    TabelaLekaraComponent,
    LekarProfilComponent,
    PacijentPreglediComponent,
    NavbarComponent,
    LekarPreglediComponent,
    RaznoComponent,
    MenadzerHomepageComponent,
    UserEditComponent,
    NewLekarComponent,
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
