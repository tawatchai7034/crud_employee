import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpViewComponent } from './components/employee/emp-view/emp-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
  { path: 'employee-list', component: EmpViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
