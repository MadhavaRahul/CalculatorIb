import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutNavComponent } from './components/layout-nav/layout-nav.component';
import { Component } from '@angular/core';
import { CalciComponent } from './components/calci/calci.component';
import { authgGuard } from './guards/authg.guard';

export const routes: Routes = [
{
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
},
{
    path:'auth',
    component:AuthComponent
},
// {
//     path:'',
//     component:LayoutNavComponent,
//     // canActivate:[authgGuard],
//     children:
//         [{component:CalciComponent}]
    
// },
{
    path:'calci',
    component:CalciComponent,
    canActivate:[authgGuard]
},
{
    path:'nav',
    component:LayoutNavComponent,
    
},
];
