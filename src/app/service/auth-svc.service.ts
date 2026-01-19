import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthSvcService {
  // private isLoggedIn=false;
  // private loggedInUser:any=null;

  constructor(private router: Router) { }
  // Register
  register(user:any):boolean{
    const users=JSON.parse(sessionStorage.getItem('angularUsers')||'[]');
    const userExists=users.find((u:any)=>u.email===user.email);
    if(userExists){
      return false;//user already exists
    }
    users.push(user);
    sessionStorage.setItem('angularUsers',JSON.stringify(users));
    return true;
  }

  // login
  login(email:string, password:string):boolean{
   const users=JSON.parse(sessionStorage.getItem('angularUsers')||'[]');
    const user=users.find((u:any)=>u.email===email && u.password===password)
    if(user){
      sessionStorage.setItem('isLoggedIn','true')
      sessionStorage.setItem('loggedInUser',JSON.stringify(user))
      return true
    }
    return false
  }
  // logout
  logout(){ 
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('loggedInUser')
    this.router.navigateByUrl('/auth');
  }
  // AUTH status
  isAuthenticated():boolean{
    return sessionStorage.getItem('isLoggedIn')==='true'
  }
  // get user info()
  getUser(){
    return JSON.parse(sessionStorage.getItem('loggedInUser')||'null');
  }
}
