import { inject } from '@angular/core'
import {Routes, CanActivateFn, Router} from '@angular/router'
import { AuthService } from './auth/auth.service' 
import { LoginComponent } from './login/login.component'
import { map } from 'rxjs'


const authGuard: CanActivateFn = () =>
{
    const auth = inject(AuthService)
    const router = inject(Router)
    if (!auth.isAuthenticated())
    {
        return router.createUrlTree(['login'])
    }

    return true
}


export const routes: Routes =[
    {
        path:'', 
        redirectTo: 'login',
        pathMatch:'full',

    }
    ,
    {
        path:'login',
        component: LoginComponent,
        title:'Login Page'
    },
    {
        path:'home',
        loadComponent: ()=> import('./home/home.component').then(m => m.HomeComponent),
        title: 'Home Page',
        canActivate: [authGuard]
    },
    {
        path:'admin',
        loadComponent: ()=>import('./admin/admin.component').then(m=>m.AdminComponent),
        title: 'Admin Page',
        canActivate: [],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path:'about',
        loadComponent: ()=>import('./about/about.component').then(m => m.AboutComponent),
        title: 'About',
        canActivate: [authGuard]
    }
]
