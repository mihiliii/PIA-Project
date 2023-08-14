import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdministrationComponent } from './administration/administration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PacijentProfilComponent } from './pacijent/pacijent-profil/pacijent-profil.component';
import { LekariComponent } from './pacijent/lekari/lekari.component';
import { TabelaLekaraComponent } from './display-components/tabela-lekara/tabela-lekara.component';
import { LekarProfilComponent } from './lekar/profil/lekar-profil.component';
import { PreglediComponent } from './pacijent/pregledi/pregledi.component';
import { NavbarComponent } from './display-components/navbar/navbar.component';
import { LekarPreglediComponent } from './lekar/lekar-pregledi/lekar-pregledi.component';
import { RaznoComponent } from './lekar/razno/razno.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdministrationComponent,
    HomepageComponent,
    PacijentProfilComponent,
    LekariComponent,
    TabelaLekaraComponent,
    LekarProfilComponent,
    PreglediComponent,
    NavbarComponent,
    LekarPreglediComponent,
    RaznoComponent,
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
