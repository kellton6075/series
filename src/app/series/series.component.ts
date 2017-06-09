import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series = [];
  constructor(private serve: ServiceService, private router: Router) { }

  ngOnInit() {
    this.serve.getSeries().subscribe(res => {
      console.log(res);
      this.series = res.body;
    });
  }
  selectSeasons(id) {
    this.router.navigate(['season', id]);
  }
}
