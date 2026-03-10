import {Injectable} from '@angular/core'
import {JwtHelperService} from '@auth0/angular-jwt'
import {HttpClient} from '@angular/common/http'
import {Observable, tap,take, map} from 'rxjs'
import { AuthStateService as AuthState } from './auth-state.service'

export interface LoginResponse
{
    accessToken: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private loginURL = 'https://dummyjson.com/user/login'
    private userURL = 'https://dummyjson.com/user/me'
    constructor(private http:HttpClient,
                public jwtHelper: JwtHelperService,
                private authState: AuthState
                ){

                }
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
                        console.log(this.isAuthenticated())
                    },
                    error: (err) =>
                    {
                    }
                })
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