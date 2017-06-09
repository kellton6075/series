import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service'
import { NgModule }      from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-firstcomponent',
  templateUrl: './firstcomponent.component.html',
  styleUrls: ['./firstcomponent.component.css']
})


export class FirstcomponentComponent implements OnInit {
users=[];

EditUser : {
  name : String,
  password : String,
  category : String
}={
  name : "",
  password : "",
  category : ""
}

  constructor(public demo1: ServiceService, private router: Router) { }

  ngOnInit() {
this.user();
}

flag=false;
flag1=false;
adduser(){
  this.flag1=!this.flag1;
}
user(){this.demo1.getusers().subscribe(a => {
  this.users = a;
  console.log(this.users);
});}
adduserfunction(dropdown) {
  // console.log(dropdown)
this.EditUser.category=dropdown;
this.demo1.setdatatoaddusers(this.EditUser).subscribe(res=>{}
)

this.user();
}

logout(){
  localStorage.clear();
  this.router.navigate(["/"])
}

}
