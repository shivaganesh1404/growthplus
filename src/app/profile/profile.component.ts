import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  Name;
  Email;
  Gender;
  Birthday;
  accessToken;
  profile_id;
  profile = {"gender" : '', "birthday" : '' }
  constructor(private fb: FormBuilder, private appService:AppService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 0, 11, 31);

  }

  ngOnInit(): void {
    this.profile_id = localStorage.getItem('profile_id')
    this.accessToken = localStorage.getItem('accessToken')
    this.appService.loginUser(this.profile_id, this.accessToken).subscribe(data =>{
      console.log(data)
      this.Name = data.name
      this.Gender = data.gender
      this.Email = data.email
      this.Birthday = data.birthday
    })
    
    
  }

  
  updateUnit(){
    this.profile.birthday = this.Birthday
    this.profile.gender = this.Gender
    console.log(this.profile)


  }
}
