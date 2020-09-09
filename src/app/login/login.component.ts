import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FacebookService, InitParams , LoginResponse, LoginOptions} from 'ngx-facebook';
import { Router } from '@angular/router';


@Component({
  selector: 'my-login-form',
  template: `
      <mat-card>
            <mat-card-title>Growth Plug Fb Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <p>
            <mat-form-field>
              <input type="text" matInput placeholder="Email" formControlName="username">
            </mat-form-field>
          </p>

          <p>
            <mat-form-field>
              <input type="password" matInput placeholder="Password" formControlName="password">
            </mat-form-field>
          </p>

          <p *ngIf="error" class="error">
            {{ error }}
          </p>

          <div class="button">
            <button type="submit" mat-button>Login</button>
          </div>

        </form>
       
      </mat-card-content>
      <div class="button" >
      <mat-icon>facebook</mat-icon>

      <button type="submit" style="color:blue" (click)="loginWithFacebook()" mat-button>Login with facebook</button>
    </div>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }

      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],

})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private fb: FacebookService, private route: Router) {

    const initParams: InitParams = {
      appId: '2734209160238587',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);

  }

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
    
    console.log("Try Facebook Login")
    alert("Try Facebook Login")

    
  }

  loginWithFacebook(): void {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list,user_age_range, user_birthday,user_gender,user_hometown'
    };


    this.fb.login(loginOptions)
      .then((response: LoginResponse) =>{
        console.log(response)
        if(response.status == "connected"){
          this.statusConfirm(response.authResponse)

        }
        else{
          console.log("Error")
          alert("Not able to connect")
        }
      })
      .catch((error: any) => console.error(error));

      
  }

  statusConfirm(response){
    localStorage.setItem("accessToken" , response.accessToken)
    localStorage.setItem("profile_id" , response.userID)

    this.route.navigate(['dashboard']);
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
