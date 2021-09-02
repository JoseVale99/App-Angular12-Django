import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: HttpClient) {
  }
  departments: any = [];
  employee: any = [];

  modalTitle = "";
  EmployeeID = 0;
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  PhotoFileName = "default.png";
  PhotoPath = environment.PHOTO_URL;



  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'employee')
      .subscribe(data => {
        this.employee = data;
      });
    this.http.get<any>(environment.API_URL + 'department')
      .subscribe(data => {
        this.departments = data;
      });

  }

  addClick() {
    this.modalTitle = "Add Employee";
    this.EmployeeID = 0;
    this.EmployeeName = "";
    this.Department = "";
    this.DateOfJoining = "";
    this.PhotoFileName = "default.png";
  }
  editClick(emp: any) {
    this.modalTitle = "Edit Employee";
    this.EmployeeID = emp.EmployeeID;
    this.EmployeeName = emp.EmployeeName;
    this.Department = emp.Department;
    this.DateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = emp.PhotoFileName;
  }
  createClick() {
    var val = {
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    }
    this.http.post(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      });
  }
  updateClick() {
    var val = {
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    }
    this.http.put(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      });
  }
  deleteClick(id: any) {
    if (confirm('Arre you sure?')) {


      this.http.delete(environment.API_URL + 'employee/' + id)
        .subscribe(res => {
          alert(res.toString());
          this.refreshList();
        });
    }
  }

}
