import { inject } from '@angular/core'
import { CanActivateFn, Router,  ActivatedRouteSnapshot, Routes} from '@angular/router'
import { AuthService } from '../../core/services/auth.service' 
import { map } from 'rxjs'

export const authGuard: CanActivateFn = () =>
{
    const auth = inject(AuthService)
    const router = inject(Router)

    return auth.isAuthenticated().pipe(
        map((isAuth:boolean) => isAuth? true: router.createUrlTree(['login']))
    )
}

const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const expectedRole = route.data['expectedRole']
    if (!auth.isAuthenticated()) {
        return router.createUrlTree(['login'])
    }
    if (!auth.checkUserRole(expectedRole)) {
        return false
    }
    return true
}