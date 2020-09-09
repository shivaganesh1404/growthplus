import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: string;
  address: string;
  phone: string;
  listed:string;
  rating:string;
  status:string;
  action:boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Google',name: 'Google', address: '2101 California st', phone: '111.111.1111',rating:'3/5',listed:'Yes',status:'check', action:true },
  {position: 'Yelp', name: 'Yelp',address: '2101 California st' ,  phone: '111.111.1111',rating:'2/5',listed:'No',status:'clear', action:false},
  {position: 'Yahoo', name: 'Yahoo!', address: '2101 California st', phone: '111.111.1111',rating:'3/5',listed:'No',status:'clear', action:false},
  {position: 'Foursquare', name: 'Foursquare', address: '2101 California st', phone: '111.111.1111',rating:'2/5',listed:'No',status:'check', action:true},
  {position: 'facebook', name: 'Facebook', address: '2101 California st',  phone: '111.111.1111',rating:'2/5',listed:'No',status:'clear', action:false},
  
];
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Output() onEventCalled: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns: string[] = ['position', 'name', 'address', 'phone','rating','listed','status','action'];
  dataSource = ELEMENT_DATA;
  isDisabled:boolean;
  constructor(private route:Router) { }

  ngOnInit(): void {
    
  }

  updateCall(e){
    console.log(e)
    if(e == 'Facebook'){
      console.log('facebook')
      this.dataSource[4].status = 'check'
      this.dataSource[4].action = true 
      // this.route.navigate(['home'])
      this.onEventCalled.emit("home");

    }
  }

}
