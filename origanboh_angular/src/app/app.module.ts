import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookComponent } from './booklist/book/book.component';
import { CartComponent } from './cart/cart.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerareaComponent } from './customerarea/customerarea.component';
import { DevModeComponent } from './dev-mode/dev-mode.component';
import { GestioneUtentiComponent } from './dev-mode/gestione-utenti/gestione-utenti.component';
import { GestioneProdottiComponent } from './dev-mode/gestione-prodotti/gestione-prodotti.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RicercaLibroComponent } from './dev-mode/ricerca-libro/ricerca-libro.component';
import { DettaglioComponent } from './booklist/book/dettaglio/dettaglio.component';
import { RicercaClienteComponent } from './dev-mode/ricerca-cliente/ricerca-cliente.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PasswordDimenticataComponent } from './password-dimenticata/password-dimenticata.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BooklistComponent,
    BookComponent,
    CartComponent,
    LoginFormComponent,
    CustomerareaComponent,
    DevModeComponent,
    GestioneUtentiComponent,
    GestioneProdottiComponent,
    RegisterFormComponent,
    RicercaLibroComponent,
    DettaglioComponent,
    RicercaClienteComponent,
    CheckoutComponent,
    PasswordDimenticataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
