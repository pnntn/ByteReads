import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookComponent } from './booklist/book/book.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { CartComponent } from './cart/cart.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerareaComponent } from './customerarea/customerarea.component';
import { DevModeComponent } from './dev-mode/dev-mode.component';
import { GestioneUtentiComponent } from './dev-mode/gestione-utenti/gestione-utenti.component';
import { GestioneProdottiComponent } from './dev-mode/gestione-prodotti/gestione-prodotti.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BooklistComponent,
    BookComponent,
    BookdetailComponent,
    CartComponent,
    LoginFormComponent,
    CustomerareaComponent,
    DevModeComponent,
    GestioneUtentiComponent,
    GestioneProdottiComponent,
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
