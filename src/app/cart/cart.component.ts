import { Component } from '@angular/core';
import {RouterModule} from '@angular/router'



interface Product
{
  id: number,
  title: string,
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string
}
interface Cart
{
  userID: number,
  products: Product[]
  totalProducts: number
  totalQuantity: 15,
}
@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrls:['cart.component.css','../layout/main-layout/main-layout.component.css'],
})
export class CartComponent {
  public cart: Product[] = []
}
