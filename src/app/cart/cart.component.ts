import { Component, OnInit, ChangeDetectorRef, inject} from '@angular/core';
import {RouterModule} from '@angular/router'
import {CartStateService as CartState} from '../core/services/carts-state.service'
import {ProductsService} from '../core/services/products.service'
import { CurrencyPipe } from '@angular/common';


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
  id: number,
  userID: number,
  products: Product[],
  total: number,
  totalProducts: number,
  totalQuantity: number,
}

@Component({
  selector: 'app-cart',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls:['cart.component.css','../layout/main-layout/main-layout.component.css'],
})
export class CartComponent implements OnInit {
  constructor (private cartState: CartState, private productService: ProductsService){}
  userCart: Cart|null = null

  private cdr = inject(ChangeDetectorRef)


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
      this.cdr.detectChanges()
    }
    )
  }
  onRemoveClick(productID: number)
  {
    const cartID= this.userCart?.id
    const products = this.userCart?.products.filter(product => product.id !== productID)
    if(!cartID || products===undefined)
    {
      return
    }
    this.productService.updateProductStatus(cartID, products).subscribe(
      {
        next: (res) =>
        {
          this.cartState.removeItem(productID)
          this.updateCartStatus()
          console.log(res)
        },
        error: (err) =>
        {
          console.log(err.message)
        }

      }
    )
  }
  onQuantityChange()
  {

  }
}
