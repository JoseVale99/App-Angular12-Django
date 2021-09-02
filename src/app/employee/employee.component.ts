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
  EmployeesName = "";
  Department = "";
  DateofJoining = "";
  photoFileName = "default.png";
  PhotoPath = environment.PHOTO_URL;



  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'employee')
      .subscribe(data => {
        this.employee = data;
      });
      this.http.get<any>(environment.API_URL+'department')
      .subscribe(data =>{
        this.departments = data;
      });

  }

  addClick() {
    this.modalTitle = "Add Employee";
    this.EmployeeID = 0;
    this.EmployeesName = "";
    this.Department = "";
    this.DateofJoining = "";
    this.photoFileName = "default.png";
  }
  editClick(emp: any) {
    this.modalTitle = "Edit Employee";
    this.EmployeeID = emp.EmployeeID;
    this.EmployeesName = emp.EmployeesName;
    this.Department = emp.Department;
    this.DateofJoining = emp.DateOfJoining;
    this.photoFileName = emp.PhotoFileName;
  }
  createClick() {
    var val = {
      EmployeesName: this.EmployeesName,
      Department: this.Department,
      DateofJoining: this.DateofJoining,
      photoFileName: this.photoFileName
    }
    this.http.post(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      });
  }
  updateClick() {
    var val = {
      EmployeeID:this.EmployeeID,
      EmployeesName: this.EmployeesName,
      Department: this.Department,
      DateofJoining: this.DateofJoining,
      photoFileName: this.photoFileName
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
  imageUploacd(event:any){
      var file = event.target.files[0];
      const formData:FormData = new FormData();
      formData.append('file', file, file.name);
      this.http.post(environment.API_URL+'employee/savefile/', formData)
      .subscribe((data:any) => {
        this.photoFileName = data.toString();
      });
  }

}
