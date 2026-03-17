import { inject } from '@angular/core'
import { CanActivateFn, Router,  ActivatedRouteSnapshot, Routes} from '@angular/router'
import { AuthService } from './core/services/auth.service' 
import { LoginComponent } from './auth/login/login.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { ProductDetailComponent } from './collections/childrens/products/childrens/product-detail/product-detail.component'
import { CartComponent } from './cart/cart.component'
import { CategoriesComponent} from './collections/childrens/categories/categories.component'
import { SpecialOfferComponent} from './special-offer/special-offer.component'
import { ProductsChildrenComponent}from './collections/childrens/products/childrens/products-children/products-children.component'
import { CollectionsComponent} from './collections/collections.component'
import { ProductsComponent} from './collections/childrens/products/products.component'
import { map } from 'rxjs'


const authGuard: CanActivateFn = () =>
{
    const auth = inject(AuthService)
    const router = inject(Router)

    return auth.isAuthenticated().pipe(
        map((isAuth:boolean) => isAuth? true: router.createUrlTree(['login']))
    )
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
    console.log('true')
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
        path: 'collections',
        component: CollectionsComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: CategoriesComponent,
                title: 'Collections',
            },
            {
                path: ':category',
                component: ProductsComponent,
                children : 
                [
                    {
                        path: '',
                        component: ProductsChildrenComponent,
                    },
                    {
                        path: ':id/:name',
                        component: ProductDetailComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'special-offer',
        component: SpecialOfferComponent,
        title: 'Special Offer',
        canActivate: [authGuard]
    },
    
]
