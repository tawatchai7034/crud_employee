import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpViewComponent } from './components/employee/emp-view/emp-view.component';
import { EmpAddComponent } from './components/employee/emp-add/emp-add.component';

const routes: Routes = [
  { path: '', component: EmpViewComponent },
  { path: 'employee-list', component: EmpViewComponent },
  { path: 'employee-add', component: EmpAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
