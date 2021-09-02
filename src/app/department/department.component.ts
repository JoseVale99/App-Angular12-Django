import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private http:HttpClient) {
   }
    departments:any=[];

   modalTitle = "";
   DepartmentID = 0;
   DepartmentName = "";

  

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data =>{
      this.departments = data;
    });

  }

  addClick(){
    this.modalTitle = "Add Department";
    this.DepartmentID = 0;
    this.DepartmentName = "";
  }
  editClick(dep:any){
    this.modalTitle = "Edit Department";
    this.DepartmentID = dep.DepartmentID;
    this.DepartmentName = dep.DepartmentName;
  }
  createClick(){
    var val = {
     DepartmentName:this.DepartmentName
    }
    this.http.post(environment.API_URL+'department',val)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList();
    });
  }
  updateClick(){
    var val = {
     DepartmentID:this.DepartmentID,
     DepartmentName:this.DepartmentName
    }
    this.http.put(environment.API_URL+'department',val)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList();
    });
  }

}
