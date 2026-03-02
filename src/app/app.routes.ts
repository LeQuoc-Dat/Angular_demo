import { inject } from '@angular/core'
import {CanActivateFn, Router,  ActivatedRouteSnapshot, Routes} from '@angular/router'
import { AuthService } from './core/services/auth.service' 
import { LoginComponent } from './auth/login/login.component'
import { HomeComponent } from './home/home.component'
import { AdminComponent } from './admin/admin.component'
import { AboutComponent } from './about/about.component'

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



const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) =>
{
    const auth = inject(AuthService)
    const router = inject(Router)
    const expectedRole = route.data['expectedRole']
    if (!auth.isAuthenticated())
    {
        return router.createUrlTree(['login'])
    }
    if (!auth.checkUserRole(expectedRole))
    {
        return false
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
        component: HomeComponent,
        title: 'Home Page',
        canActivate: [authGuard]
    },
    {
        path:'admin',
        component: AdminComponent,
        title: 'Admin Page',
        canActivate: [roleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path:'about',
        component: AboutComponent,
        title: 'About',
        canActivate: [authGuard]
    }
]
