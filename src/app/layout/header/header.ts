import { Component } from '@angular/core';
import {RouterModule} from '@angular/router'
import {faList, faMagnifyingGlass, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  iconList = faList
  iconSearch = faMagnifyingGlass
  iconCart = faCartShopping
}
