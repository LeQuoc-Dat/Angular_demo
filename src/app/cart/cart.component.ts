import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router'
import {CartStateService as CartState} from '../core/services/carts-state.service'


interface Product
{
  id: number,
  title: string,
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string,
}

interface Cart
{
  userID: number,
  products: Product[],
  total: number,
  totalProducts: number,
  totalQuantity: number,
}

@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrls:['cart.component.css','../layout/main-layout/main-layout.component.css'],
})
export class CartComponent implements OnInit {
  constructor (private cartState: CartState){}
  userCart: Cart|null = null


  ngOnInit(): void {
    this.updateCartStatus()
  }
  updateCartStatus():void
  {
    this.cartState.cart$.subscribe(cart =>
    {
      if (!cart)
      {
        return
      }
      this.userCart = cart
    }
    )
  }
  onRemoveClick()
  {
    
  }
}
