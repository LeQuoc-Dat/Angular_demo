import { Component } from '@angular/core';
import {RouterModule, Router} from '@angular/router'
import {faList, faMagnifyingGlass, faCartShopping} from '@fortawesome/free-solid-svg-icons'
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
  onCartBtnClick()
  {
    this.route.navigate(['cart'])
  }
}
