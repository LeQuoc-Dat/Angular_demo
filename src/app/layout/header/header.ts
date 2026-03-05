import { Component } from '@angular/core';
import {RouterModule, Router} from '@angular/router'
import {faList, faMagnifyingGlass,
        faCartShopping, faSortDown,
        faAngleDown, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  constructor(private route: Router){}


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
