import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ServiceService} from  '../service.service'

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {
  flag:boolean=false;
  Editseason: {
      seasonId:Number,

      name: String,
      Description: String,
      seriesid: Number,
      image:String
    }={
      seasonId:null,

      name: "",
      Description:"",
      seriesid:null ,
    image:""
    }
  seriesid:Number;
  seasons= [];
  constructor(private serve: ServiceService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {           //params observable always return a string of current url
      this.seriesid = this.route.snapshot.params['option'];
      //this.departmentId2 = params['id'];              // error will occur while arithmatic operations
    })
    this.serve.getSeasons(this.seriesid).subscribe(res => {
      console.log(res);
      this.seasons = res.body;
    })
  }
  changeListener(event) {
 console.log(event.target)
 this.encodeImageFileAsURL(event.target)
 }
 encodeImageFileAsURL(element) {
 var file=element.files[ 0 ];
 var reader=new FileReader( );
 reader.onloadend=(data => {
 // this.base64=reader.result;
 this.Editseason.image=reader.result;//reader.result stores image in a base 64 format
 //console.log('RESULT', reader.result)
 })
 reader.readAsDataURL(file);
 //console.log(this.base64);
 }
  func()
  {
    this.Editseason.seriesid=this.seriesid;
    this.flag=!this.flag;
  }
addseason()
{console.log(this.Editseason , "in component")
  this.serve.postseasons(this.Editseason).subscribe(res => { console.log(res) }
      );
}


  selectComics(id){
    this.router.navigate(['comics',this.seriesid,id]);
  }
}
