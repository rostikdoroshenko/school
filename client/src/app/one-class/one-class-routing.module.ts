import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OneClassComponent } from './one-class.component';

const routes: Routes = [
  {
    path: '',
    component: OneClassComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneClassRoutingModule {}
