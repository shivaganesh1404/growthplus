import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FacebookService, InitParams,  } from 'ngx-facebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedValue : String = "Listing"
  profile:boolean = false;
  list:boolean = true;
  setting:boolean = false;
  city:boolean = true;
  constructor(private fb: FacebookService, private route: Router) {

    const initParams: InitParams = {
      appId: '2734209160238587',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);

  }

  ngOnInit() {
    this.fb.getLoginStatus()
    .then(data=>{
      console.log(data)
    })
    .catch(console.error.bind(console));
    this.selectedValue = 'Listing'
    this.city = true
  }
   routes =  [
    { path: 'profile', label: 'Profile' , icon:'person' , color:'#f1f1f1' },
    { path: 'listing',  label: 'Listing' , icon:'list', color:'#f1f1f1'},
    { path: 'setting', label: 'Setting' , icon:'build', color:'#f1f1f1' }
   ];


   toogleClick(e){
     this.setting=false;
     this.list=false;
     this.profile=false;
    console.log(e)
    if(e == 'Profile'){;
      this.list = false;
      this.setting = false
      this.profile = true;
      this.city =false
    }
    else{
      if(e == 'Listing'){
        this.setting = false
        this.profile = false;
        this.list = true
        this.city = true

      }
      else{
        if(e== 'Setting'){
          this.profile = false;
          this.list = false
          this.setting = true
          this.city =false
        }
        
      }

    }
   }

   logout(){
    this.fb.logout().then(() => {
      console.log('Logged out!')
      this.route.navigate([''])
    
    });
  }

  public doSomething(data: any):void {
      this.selectedValue = 'Profile'
      this.profile = true;
      this.list = false;
      this.setting = false;
      this.city = false

  }

}
