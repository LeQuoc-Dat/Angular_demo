import {Injectable, Inject, PLATFORM_ID} from '@angular/core'
import {isPlatformBrowser} from '@angular/common'
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn:'root'})
export class AuthStateService {
    private tokenSubject = new BehaviorSubject<string|null>(null)
    private user = new BehaviorSubject<any|null>(null)

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
            this.user.next(JSON.parse(savedUser))
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
        this.user.next(userInfo)
      }
      removeUserInfo()
      {
        if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        localStorage.removeItem('User')
        this.user.next(null)
      }
      getUser()
      {
         if (!isPlatformBrowser(this.plaformId))
        {
            return null
        }
        return this.user.value
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