import { inject } from '@angular/core'
import {CanActivateFn, Router,  ActivatedRouteSnapshot, Routes} from '@angular/router'
import { AuthService } from './core/services/auth.service' 
import { LoginComponent } from './auth/login/login.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { ProductsComponent } from './products/products.component'
import { CartComponent } from './cart/cart.component'

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
        title:'Login'
    },
    {
        path:'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuard]
    },
    {
        path:'about',
        component: AboutComponent,
        title: 'About Us',
        canActivate: [authGuard]
    },
    {
        path:'cart',
        component: CartComponent,
        title: 'Cart',
        canActivate: [authGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
        canActivate: [authGuard]
    }
]
