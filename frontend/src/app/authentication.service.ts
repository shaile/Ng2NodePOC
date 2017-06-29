import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppSettings } from './app-settings';

@Injectable()
export class AuthenticationService {
   headers: Headers;
   baseAddress: string = AppSettings.API_ENDPOINT;
    constructor(private http: Http) {
       this.headers = new Headers({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials':true,
       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
       'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
       });
     }

    login(data: any) {
        return this.http
        .post(this.baseAddress + "login/", JSON.stringify(data), { headers: this.headers })
        .map((response: Response) => {
                let user = response.json();
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
        })    
        .catch((error: any) => Observable.throw('Server error'));
    }

    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}