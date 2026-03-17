import {Injectable, Inject, PLATFORM_ID} from '@angular/core'
import {isPlatformBrowser} from '@angular/common'
import {BehaviorSubject} from "rxjs";


interface User
{
    firstName : string
    lastName:string
    role:string
}
@Injectable({providedIn:'root'})
export class AuthStateService {
    private tokenSubject = new BehaviorSubject<string|null>(null)
    private userSubject = new BehaviorSubject<User|null>(null)
    public token$ = this.tokenSubject.asObservable();
    public user$ = this.userSubject.asObservable();
    

    constructor( @Inject(PLATFORM_ID) private plaformId: Object,)
    {
        this.loadToken()
        this.loadUser()
    }


       private loadToken()
      {
        if ( isPlatformBrowser(this.plaformId))
        {
        const savedToken = localStorage.getItem('Token')
        if(savedToken)
        {
            this.tokenSubject.next(savedToken)
        }
        }
      }
      private loadUser()
      {
         if ( isPlatformBrowser(this.plaformId))
        {
        const savedUser = localStorage.getItem('User')
        if(savedUser)
        {
            this.userSubject.next(JSON.parse(savedUser))
        }
        }
      }
      setUserInfo(userInfo: any)
      {
        if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        localStorage.setItem('User', JSON.stringify(userInfo))
        this.userSubject.next(userInfo)
      }
      removeUserInfo()
      {
        if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        localStorage.removeItem('User')
        this.userSubject.next(null)
      }
      getUser()
      {
         if (!isPlatformBrowser(this.plaformId))
        {
            return null
        }
        return this.userSubject.value
      }

    setToken(token:string)
    {
        if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        this.tokenSubject.next(token)
        localStorage.setItem('Token', token);
    }
    clearToken()
    {
         if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        this.tokenSubject.next(null)
        localStorage.removeItem('Token')
    }
    getToken()
    {
         if (!isPlatformBrowser(this.plaformId))
        {
            return null
        }
        return this.tokenSubject.value
    }
}