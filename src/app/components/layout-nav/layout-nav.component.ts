import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthSvcService } from '../../service/auth-svc.service';
import { CalciComponent } from '../calci/calci.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-nav',
  standalone: true,
  imports: [RouterOutlet,CalciComponent, CommonModule],
  templateUrl: './layout-nav.component.html',
  styleUrl: './layout-nav.component.css'
})
export class LayoutNavComponent implements OnInit{
private authsvc=inject(AuthSvcService)
private router=inject(Router)
loggedUser:any=null
ngOnInit(): void {
  this.loggedUser=this.authsvc.getUser();
}
onLogout(){
  this.authsvc.logout()

}
}
