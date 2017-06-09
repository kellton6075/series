import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../service.service'
@Component({
  selector: 'app-thirdcomponent',
  templateUrl: './thirdcomponent.component.html',
  styleUrls: ['./thirdcomponent.component.css']
})
export class ThirdcomponentComponent implements OnInit {
  token: any;
  series = [];
  var1: any;
  data: string;
  tempvar: any;
  flag: boolean = false;
  password: string;
  dataobj = {
    name: "",
    password: ""
  }
  EditUser: {
    name: String,
    password: String,
    seriesid: String
  }={
    name: "",
    password: "",
    seriesid: ""
  }
  constructor(public demo: ServiceService, private router: Router) { }
  ngOnInit() {

    this.demo.getSeries().subscribe(res => {
      console.log(res);
      this.series = res.body;
    });

  }

  func(id) {
    this.flag = !this.flag;
    this.tempvar = id;
  }

  addsubscription() {
    this.EditUser.seriesid = this.tempvar;
this.demo.subscribe(this.EditUser).subscribe(res => { }
    );


  }


  login() {
    // this.router.navigate(['/first-page']);
    this.demo.logindata(this.dataobj).subscribe(res => {
      console.log(res);
      this.var1 = res.body.category;
      this.token = res.token;
      localStorage.setItem('response', this.token);
      console.log(this.token, " in login  ");

      if (this.var1 == 0) {
        console.log("user")

        this.router.navigate(["/first-page"])
      }
      else if (this.var1 == 1) {
        // console.log("admin")
        this.router.navigate(["/series"])

      }
      else if (this.var1 == 2) {
        // console.log("user")
        this.router.navigate(["/search"])
      }
      else {
        console.log("user doesn't exit")
      }
    })



  }


}
