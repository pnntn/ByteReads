import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerareaComponent } from './customerarea/customerarea.component';
import { DevModeComponent } from './dev-mode/dev-mode.component';
import { GestioneUtentiComponent } from './dev-mode/gestione-utenti/gestione-utenti.component';
import { GestioneProdottiComponent } from './dev-mode/gestione-prodotti/gestione-prodotti.component';
import { DettaglioComponent } from './booklist/book/dettaglio/dettaglio.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PasswordDimenticataComponent } from './password-dimenticata/password-dimenticata.component';

const routes: Routes = [
  {
    path: 'area-admin',
    component: DevModeComponent,
  },
  {
    path: 'gestione-prodotti',
    component: GestioneProdottiComponent,
  },
  {
    path: 'gestione-utenti',
    component: GestioneUtentiComponent,
  },
  {
    path: 'area-cliente',
    component: CustomerareaComponent,
  },
  {
    path: 'byId',
    component: DettaglioComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'password-dimenticata',
    component: PasswordDimenticataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
