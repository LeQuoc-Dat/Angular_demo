import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject} from '@angular/core';
import { RouterModule} from '@angular/router'
import { CartStateService} from '../core/services/carts-state'
import { ProductsService} from '../core/services/products.service'
import { CurrencyPipe } from '@angular/common';
import { Cart} from '../shared/models/carts.model'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls:['cart.component.css','../layout/main-layout/main-layout.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {

  constructor (
    private cartState: CartStateService,
    private productService: ProductsService
  ){}
  
  userCart: Cart|null = null
  private cdr = inject(ChangeDetectorRef)
  sud!: Subscription;
  ngOnInit(): void {
    this.updateCartStatus()
  }

  ngOnDestroy(): void {
    this.sud.unsubscribe()
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
    const productSub = this.productService.updateProductStatus(cartID, products).subscribe({
        next: (res) =>
        {
          this.cartState.removeItem(productID)
          this.updateCartStatus()
        },
        error: (err) =>
        {
        }

      }
    )
    this.sud.add(productSub)
  }
}
