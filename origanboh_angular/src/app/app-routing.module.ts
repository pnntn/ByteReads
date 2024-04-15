import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { CustomerareaComponent } from './customerarea/customerarea.component';

const routes: Routes = [
  {
    path: 'dettaglio',
    component: BookdetailComponent,
  },
  { path: 'area-admin', component: BookdetailComponent },
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
