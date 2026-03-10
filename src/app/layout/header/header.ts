import {Component, OnInit, ChangeDetectorRef, inject} from '@angular/core';
import {RouterModule, Router} from '@angular/router'
import {faList, faMagnifyingGlass,
        faCartShopping, faSortDown,
        faAngleDown, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {NgStyle} from '@angular/common';
import {ProductsService} from'../../core/services/products.service'
import {AuthStateService} from '../../core/services/auth-state.service'


interface user
{
  lastName:string
  firstName: string
}
@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterModule, NgStyle],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit{
  constructor(private route: Router, private productService : ProductsService,
    private authState: AuthStateService
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

  private cdr = inject(ChangeDetectorRef)


  ngOnInit(): void {
    this.loadUserInfo()
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
