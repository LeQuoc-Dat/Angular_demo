import {Component, OnInit, ChangeDetectorRef, inject} from '@angular/core';
import {RouterModule, Router} from '@angular/router'
import {faList, faMagnifyingGlass,
        faCartShopping, faSortDown,
        faAngleDown, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {NgStyle, AsyncPipe, CurrencyPipe} from '@angular/common';
import {ProductsService} from'../../core/services/products.service'
import {AuthStateService} from '../../core/services/auth-state.service'
import {CartStateService} from '../../core/services/carts-state.service'


interface user
{
  lastName:string
  firstName: string
}
@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterModule, NgStyle, AsyncPipe, CurrencyPipe],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit{
  constructor(private route: Router, private productService : ProductsService,
    private authState: AuthStateService,
    public cartState: CartStateService
  ){}


  iconList = faList
  iconSearch = faMagnifyingGlass
  iconCart = faCartShopping
  iconSortDown = faSortDown
  iconArrowDown = faAngleDown
  iconHeart = faHeart
  iconUser = faUser




  isAccountToggled = false
  isCountryToggled = false
  isCurrencyToggled = false

  userInfo: any = null
  totalItemsInCart = 0
  totalPriceInCart=0

  private cdr = inject(ChangeDetectorRef)


  ngOnInit(): void {
    this.loadUserInfo()
    this.loadNumberItemsInCart()
  }

  loadUserInfo()
  {
   this.authState.user$.subscribe(user=>
   {
    this.userInfo = user
    this.cdr.detectChanges()
   }
   )
  }

  loadNumberItemsInCart()
  {
    this.cartState.cart$.subscribe(cart =>
    {
      const quanlity = cart?.totalQuantity
      const price =  cart?.total
      if (!quanlity || !price)
      {
        return
      }
      this.totalItemsInCart = quanlity
      this.totalPriceInCart = price
    }
    )
  }

  onCartBtnClick()
  {
    this.route.navigate(['cart'])
  }


  toggleAccount():void
  {
    this.isAccountToggled = !this.isAccountToggled
  }
  toggleCountry():void
  {
    this.isCurrencyToggled = false;
    this.isCountryToggled = !this.isCountryToggled
  }
  toggleCurrency():void
  {
    this.isCountryToggled = false;
    this.isCurrencyToggled = !this.isCurrencyToggled
  }
  
}
