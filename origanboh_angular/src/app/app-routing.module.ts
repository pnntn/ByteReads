import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { CustomerareaComponent } from './customerarea/customerarea.component';
import { DevModeComponent } from './dev-mode/dev-mode.component';
import { GestioneUtentiComponent } from './dev-mode/gestione-utenti/gestione-utenti.component';
import { GestioneProdottiComponent } from './dev-mode/gestione-prodotti/gestione-prodotti.component';

const routes: Routes = [
  {
    path: 'dettaglio',
    component: BookdetailComponent,
  },
  { 
    path: 'area-admin', 
    component: DevModeComponent },
  {
    path: 'gestione-prodotti',
    component : GestioneProdottiComponent
  },
  {
    path: 'gestione-utenti',
    component: GestioneUtentiComponent,
  },
  {
    path: 'area-cliente',
    component: CustomerareaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
