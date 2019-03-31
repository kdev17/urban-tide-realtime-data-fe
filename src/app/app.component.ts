import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  elementCount = 0;
  num_element_transaction;
  response;
  subs: Array<Subscription> = [];
  
  constructor(private http: HttpClient){
    this.getAll();  
    const counterSec = interval(1000);
    const sub = counterSec.subscribe(i => this.numberOfElements());
    this.subs.push(sub);
  }

  ngOnDestroy(){
    this.subs.map(el => el.unsubscribe());
  }

  getAll(){
    this.http.get('api/').subscribe(d => {
      console.log(d);
      this.response = d;
    }, err => {
      console.log('Subscribe before');
    });
  }

  private numberOfElements(){
    this.http.get('api/num_element_transaction').subscribe((d: any) => {
      console.log(d);
      this.elementCount = d.count;
    }, err => {
      console.log('Subscribe before');
    });
  }

  subscribe(){
    this.http.get('api/sub').subscribe(d => {
      console.log(d);
    });
  }

  unsubscribe(){
    this.http.get('api/unsub').subscribe(d => {
      console.log(d);
    });
  }

  search(idT){
    console.log(idT.value);
    this.http.get('api/transaction?idT=' + idT.value).subscribe(d => {
      console.log(d);
      this.response = d;
    });
  }

}
