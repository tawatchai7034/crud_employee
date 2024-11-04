import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  REST_API: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.REST_API}employee/getall`);
  }

  create(req: EmployeeModel): Observable<any> {
    return this.http.post(`${this.REST_API}employee/create`, req);
  }
}
