import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';
import { AppComponent } from './app.component';
import { FirstcomponentComponent } from './firstcomponent/firstcomponent.component';
// import { SecondcomponentComponent } from './secondcomponent/secondcomponent.component';
import { ThirdcomponentComponent } from './thirdcomponent/thirdcomponent.component';

import { ServiceService } from './service.service'
import { RouterModule, Routes} from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { SeasonComponent } from './season/season.component';
import { ComicComponent } from './comic/comic.component';
import { SearchComponent } from './search/search.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  // {
  //     path: '', component: SecondcomponentComponent
  // },
  {
      path: '', component: ThirdcomponentComponent
  },
  {
      path: 'api/app/verification/:token', component: VerifyComponent
  },
  {
      path: 'first-page', component: FirstcomponentComponent
  },
  {
      path: 'season/:option', component: SeasonComponent
  },
  {
      path: 'series', component: SeriesComponent
  },
  {
      path: 'comic', component: ComicComponent
  },
  {
      path: 'search', component: SearchComponent
  }

]
@NgModule({
  declarations: [
    AppComponent,
    FirstcomponentComponent,
    // SecondcomponentComponent,
    ThirdcomponentComponent,
    SeriesComponent,
    SeasonComponent,
    ComicComponent,
    SearchComponent,
    VerifyComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,DatePickerModule,
    HttpModule,  RouterModule.forRoot(routes)
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
