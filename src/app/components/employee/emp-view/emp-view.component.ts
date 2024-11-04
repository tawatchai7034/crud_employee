import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee';

@Component({
  selector: 'app-emp-view',
  templateUrl: './emp-view.component.html',
  styleUrl: './emp-view.component.css',
})
export class EmpViewComponent implements OnInit {
  constructor(private readonly employeeService: EmployeeService) {}

  empList: EmployeeModel[] = [];

  ngOnInit() {
    this.employeeService.getAll().subscribe((res) => {
      // console.log(res);
      if (res.code == 200) {
        this.empList = res.result;
      } else {
        console.log(res);
      }
    });
  }
}
