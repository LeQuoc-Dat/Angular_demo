import { Routes} from '@angular/router'
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
        children: [ {
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
