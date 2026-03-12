import { Component, OnInit, DestroyRef, inject, ChangeDetectorRef} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService} from '../core/services/products.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {IconList} from '../core/components/icon-list'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DecimalPipe } from '@angular/common';


interface Meta
{
  createdAt: string,
  updatedAt: string,
  barcode: string,
  qrCode: string

}
interface Review
{
  rating: number,
  comment: string,
  date:string,
  reviewerName: string,
  reviewerEmail: string

}
interface Product
{
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags:string [],
  images: string[],
  reviews: Review[],
  meta: Meta
  minimumOrderQuantity: number,

}


@Component({
  selector: 'app-special-offer',
  imports: [RouterModule, FontAwesomeModule, DecimalPipe],
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.css', '../layout/main-layout/main-layout.component.css'],
})
export class SpecialOfferComponent implements OnInit{
  constructor (private productService: ProductsService){

  }
  productList: Product[] = []
  saleProductList: Product[] = []
  
  private destroyRef = inject(DestroyRef)
  private cdr =  inject(ChangeDetectorRef)
  
  iconList = inject(IconList)

  ngOnInit(): void {
    this.loadProductList()
  }

  loadProductList():void
  {
    this.productService.loadAllProduct().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      {
        next: (res)=>
        {
          this.productList= res.products
          this.loadSaleProduct()
        },

        error: (err) =>
        {
          console.log(err.message)
        }
      }
    )
  }
  loadSaleProduct(): void
  {
    this.saleProductList = [...this.productList].filter(product=> product.discountPercentage!== 0&&product.discountPercentage !==null)
    this.cdr.detectChanges()
  }
}
