import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { NavbarComponentComponent } from './headerComponent/navbar-component/navbar-component.component';
import { BooklistComponentComponent } from './booklist-component/booklist-component.component';
import { BookdetailComponentComponent } from './bookdetail-component/bookdetail-component.component';
import { LoginFormComponentComponent } from './login-form-component/login-form-component.component';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    NavbarComponentComponent,
    BooklistComponentComponent,
    BookdetailComponentComponent,
    LoginFormComponentComponent,
    CartComponentComponent,
    FooterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
