import { Routes} from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { authGuard} from './shared/guard/auth.guard'

export const routes: Routes =[ {
        path:'', 
        redirectTo: 'login',
        pathMatch:'full',
    },
    {
        path:'login',
        component: LoginComponent,
        title:'Login'
    },
    {
        path:'home',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
        canActivate: [authGuard]
    },
    {
        path:'about',
        loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent),
        title: 'About Us',
        canActivate: [authGuard]
    },
    {
        path:'cart',
        loadComponent: ()=> import('./cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
        canActivate: [authGuard]
    },
    {
        path: 'collections',
        loadComponent: ()=> import('./collections/collections.component').then((m)=> m.CollectionsComponent),
        canActivate: [authGuard],
        children: [ {
                path: '',
                loadComponent: ()=> import('./collections/childrens/categories/categories.component').then((m)=> m.CategoriesComponent),
                title: 'Collections',
            },
            {
                path: ':category',
                loadComponent: ()=> import('./collections/childrens/products/products.component').then((m)=> m.ProductsComponent),
                children : 
                [
                    {
                        path: '',
                        loadComponent: ()=> import('./collections/childrens/products/childrens/products-children/products-children.component')
                        .then((m)=> m.ProductsChildrenComponent),
                    },
                    {
                        path: ':id/:name',
                        loadComponent: ()=> import('./collections/childrens/products/childrens/product-detail/product-detail.component')
                        .then((m)=> m.ProductDetailComponent),
                    }
                ]
            }
        ]
    },
    {
        path: 'special-offer',
         loadComponent: ()=> import('./special-offer/special-offer.component').then((m)=> m.SpecialOfferComponent),
        title: 'Special Offer',
        canActivate: [authGuard]
    },
    
]
