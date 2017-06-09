import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class ServiceService {

  constructor(private _http: Http) {
  }
  private url = "http://localhost:2000/api/app/get_items";
  private url2 = "http://localhost:2000/api/app/get_users";
  private url3 = "http://localhost:2000/api/app/post_item";
  private url4 = "http://localhost:2000/api/app/get_comics";
  private url5 = "http://localhost:2000/api/app/post_comics";
  private url6 = "http://localhost:2000/api/app/verification";
  private url7 = "http://localhost:2000/api/app/get_series";
  private url8=  "http://localhost:2000/api/app/get_seasons";
  private url9=  "http://localhost:2000/api/app/postsubuser";
  private url10="http://localhost:2000/api/app/post_season";
  userid;
  userpassword;
  obj;
  token;
  obj2: {
    username: String,
    password: String,
    category: String,
  } = {
    username: '',
    password: '',
    category: ''
  }
  setdata(dataobj) {
    this.obj = dataobj;
  }

  //get comic
  getComics(): Observable<any> {
    return this._http.get(this.url4)
      .map((res: Response) => res.json())
  }

  //post comic
  PostComic(Data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(Data);
    return this._http.post(this.url5, Data, headers).map(
      (res: Response) => res.json());
  }
//to add users in tempuser()
  setdatatoaddusers(dataobj): Observable<any> {

//used jwt token to add data
    this.token = localStorage.getItem('response')

    console.log(this.token, " in sent data")

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    console.log(headers, "this is header");
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.url3, dataobj, options).map((res: Response) => res.json());

  }

  logindata(obj): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url, obj, headers).map((res: Response) => res.json());
  }

//function to add users in users(permanent) database
  logindata2(obj): Observable<any> {
    console.log(obj + "hi");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url6, obj, headers).map((res: Response) => res.json());
  }

  getSeries(): Observable<any> {
    return this._http.get(this.url7)
      .map((res: Response) => res.json())
  }

  getSeasons(id):Observable<any> {
    console.log(id)
    return this._http.get(this.url8+"/"+id)
    .map((res: Response) => res.json())

  }
postseasons(obj):Observable<any>{
  console.log(obj , " in service")
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this._http.post(this.url10, obj, options).map((res: Response) => res.json());
}

  subscribe(dataobj): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url9, dataobj, headers).map((res: Response) => res.json());
    }


  getComparedusers() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.url, this.obj, headers)
      .map((res: Response) => res.json())
  }

  getusers(): Observable<any> {
    return this._http.get(this.url2)
      .map((res: Response) => res.json())
  }

  postuserdata() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.url3, this.obj2, headers)
      .map((res: Response) => res.json())

  }
}
