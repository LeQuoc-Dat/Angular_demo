import {Injectable} from '@angular/core'
import {JwtHelperService} from '@auth0/angular-jwt'
import {HttpClient} from '@angular/common/http'
import {Observable, tap,take, map} from 'rxjs'
import {AuthStateService as AuthState } from './auth-state.service'
import {CartStateService as CartState} from './carts-state.service'

export interface LoginResponse
{
    id: number
    accessToken: string;
}

interface UserCartRespone
{
    carts: Cart[]
}

interface Product
{
  id: number,
  title: string,
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string
}

interface Cart
{
  userID: number,
  products: Product[],
  total: number,
  totalProducts: number,
  totalQuantity: number,
}


@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private loginURL = 'https://dummyjson.com/user/login'
    private userURL = 'https://dummyjson.com/user/me'
    private userCartURL = 'https://dummyjson.com/carts'
    constructor(private http:HttpClient,
                public jwtHelper: JwtHelperService,
                private authState: AuthState,
                private cartState: CartState
                ){}

    login(username: string, password: string): Observable<any>
    {
        return this.http.post<LoginResponse>(this.loginURL,{username, password}).pipe(
            tap(res =>
            {
                this.authState.clearToken()
                this.authState.removeUserInfo()
                const token = res.accessToken
                this.authState.setToken(token)
                this.getUser().subscribe({
                    next: (res) =>
                    {
                    },
                    error: (err) =>
                    {
                        console.error(err.message)
                    }
                })
                const userID = res.id
                this.getUserCart(userID).subscribe(
                    {
                        next: (res) =>{
                            console.log(res)
                        },
                        error: (err) =>
                        {
                            console.error(err.message)
                        }
                    }
                )
            }
            )
        )
    }

    getUser():Observable<any>
    {
        const accessToken = this.authState.getToken()
        return this.http.get(this.userURL,{headers: {Authorization: `Bearer ${accessToken}`}}).pipe(
            tap(res =>
            {
                this.authState.setUserInfo(res)
            }
            )
        )
    }

    getUserCart(userID: number): Observable<any>
    {
        return this.http.get<UserCartRespone>(`${this.userCartURL}/user/${userID}`).pipe(
            tap(res =>
            {
                this.cartState.setCart(res.carts[0])
                console.log(this.cartState.getCart())
            }
            )
        )
    }
    setNewUserCart(userID: number): Observable<any>
    {
        return this.http.post<Cart>(`${this.userCartURL}/add`,
            {
                userId: userID,
                products: [{}]
            },
            {
                headers: {'Content-Type': 'application/json'}
            }
        ).pipe(
            tap(res =>
            {
                console.log(res)
            }
            )
        )
    }

    public isAuthenticated(): Observable<boolean>
    {
        return this.authState.token$.pipe(
            map(token => !!token && !this.jwtHelper.isTokenExpired(token)),
            take(1)
        )
    }

    public checkUserRole(expectedRole: string): Observable<boolean>
    {
        return this.authState.user$.pipe(
            map(user => !!user&&user.role === expectedRole)
        )
    }


}