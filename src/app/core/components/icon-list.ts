import {faHeart , faEnvelopeOpen} from  '@fortawesome/free-regular-svg-icons'
import {faCartShopping, faTruck, faShirt,
     faMoneyBill1, faUmbrella, faTv,
     faCouch, faTree, faBagShopping,
     faArrowsUpDownLeftRight, faSpinner
    } from '@fortawesome/free-solid-svg-icons'
import { Injectable } from '@angular/core'

@Injectable(
    {
        providedIn: 'root'
    }
)
export class IconList
{
    public iconHeart = faHeart
    public iconCart = faCartShopping
    public iconTruck = faTruck
    public iconMoney = faMoneyBill1
    public iconUmberlla = faUmbrella
    public iconMail = faEnvelopeOpen
    public iconTV = faTv
    public iconShirt = faShirt
    public iconSofa = faCouch
    public iconTree = faTree
    public iconShopping = faBagShopping
    public iconMultiArrows = faArrowsUpDownLeftRight
    public iconLoading = faSpinner
}
