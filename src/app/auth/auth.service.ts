import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthService {
    constructor(private http: HttpClient){}

    createUser(email: string, password: string){
        const authData: AuthData = {email, password}
        console.log(authData)
        this.http.post("http://localhost:3001/api/user/signup", authData )
            .subscribe(res => {
                console.log(res, "hit")
            })
    }

    login(email:string, password: string) {
        const authData: AuthData = {email, password}
        this.http.post("http://localhost:3001/api/user/login", authData)
            .subscribe(res => {
                console.log(res)
            })
    }
}