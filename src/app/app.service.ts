import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
};

const httpOptionNew = {
  headers: new HttpHeaders({'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = "https://shiva1404.pythonanywhere.com/profile/?profile_id="
  id;
  access;
  constructor(private http : HttpClient) { }


 /**
   * Get Profile Data Api
   */
  public loginUser(id, access):Observable<any>{
    this.id = id;
    this.access= access;
 
    return this.http.get(this.url + this.id + '&access_token=' + this.access );
  }

  /**
   * Get Profile Data Email & Birthday Api
   */
  public postUserProfile(e):Observable<any>{
     
    return this.http.post(this.url + this.id + '&access_token=' + this.access ,JSON.stringify(e), httpOptions);
  }

}
