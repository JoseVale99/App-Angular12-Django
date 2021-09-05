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

   DepartmentIDFilter="";
   DepartmentNameFilter="";
   departmentsWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data =>{
      this.departments = data;
      this.departmentsWithoutFilter = data;
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
  deleteClick(id:any){
    if (confirm('Arre you sure?')){

   
    this.http.delete(environment.API_URL+'department/'+id)
    .subscribe(res => {
      alert(res.toString());
      this.refreshList(); 
  });
  }

} 
FilterFn(){
  var DepartmentIDFilter=this.DepartmentIDFilter;
  var DepartmentNameFilter=this.DepartmentNameFilter;


  this.departments=this.departmentsWithoutFilter.filter(
    function(el:any){
      return el.DepartmentID.toString().toLowerCase().includes(
        DepartmentIDFilter.toString().trim().toLowerCase()
      )&& 
        el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase())
    }
  );
}

sortResult(prop:any,asc:any){
  this.departments=this.departmentsWithoutFilter.sort(function(a:any,b:any){
    if(asc){
      return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
    }
    else{
      return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
    }
  });
}
}
