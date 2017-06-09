import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ServiceService} from '../service.service'
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,public demo:ServiceService) { }
object={
  option:'',
  id:''
}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        let userId = params['token'];
        console.log(userId);
this.object.id=userId
        this.demo.logindata2(this.object).subscribe(res=>{console.log(res);
      })



})
}
}
