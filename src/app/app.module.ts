import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmpViewComponent } from './components/employee/emp-view/emp-view.component';
import { EmpAddComponent } from './components/employee/emp-add/emp-add.component';
import { EmpEditComponent } from './components/employee/emp-edit/emp-edit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmpViewComponent,
    EmpAddComponent,
    EmpEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
