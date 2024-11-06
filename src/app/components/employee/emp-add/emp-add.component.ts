import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrl: './emp-add.component.css',
})
export class EmpAddComponent {
  employeeForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit() {}

  onSubmit(){
    // this.employeeService.create(this.employeeForm.value).subscribe(
    //   () => {
    //     console.log('Data added successfully');
    //     this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
