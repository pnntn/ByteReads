import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailComponent } from './bookdetail/bookdetail.component';

const routes: Routes = [
  {
    path: 'dettaglio',
    component: BookdetailComponent,
  },
  { path: 'area-admin', component: BookdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
