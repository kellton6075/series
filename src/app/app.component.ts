import { Component } from '@angular/core';
import {ServiceService} from './service.service'
import { NgModule }      from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  var1:any;
  data:string;
  password:string;
  dataobj = {
    name : "",
    password : ""
  }
  constructor(public demo: ServiceService, private router: Router) { }
  ngOnInit() {
  // this.loadGitUserDetails();

}
// loadGitUserDetails() {
//     // this.demo.getComparedusers().subscribe(a => {
//     //   // this.var1 = a.body[0].category;
//     //   this.var1 =a.body[0].category;
//     //   console.log(this.var1);
//     //   // localStorage.setItem('response', a.body[0]);
//     //   // console.log(localStorage.getItem('response'));
//     //   if(this.var1 == 1){
//     //       this.router.navigate(['/first-page']);
//     //       }
//     //
//     // if(a.body.category == 2){
//     //     document.cookie = "sessionid" + "=" + "user = " + a.body.name + "??" + "role = " + a.body.category;
//     //   }
//     // })
//     //
//
//   }
// func() {
//
//   this.demo.setdata(this.dataobj);
// this.loadGitUserDetails();
// // console.log("a")
// }
}
