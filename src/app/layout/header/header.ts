import { Component } from '@angular/core';
import {faList, faMagnifyingGlass, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  iconList = faList
  iconSearch = faMagnifyingGlass
  iconCart = faCartShopping
}
