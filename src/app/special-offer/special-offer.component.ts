import { Component, OnInit, DestroyRef, inject, ChangeDetectorRef} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService} from '../core/services/products.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {IconList} from '../core/components/icon-list'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DecimalPipe, NgClass} from '@angular/common';


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
  imports: [RouterModule, FontAwesomeModule, DecimalPipe, NgClass],
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.css', '../layout/main-layout/main-layout.component.css'],
})
export class SpecialOfferComponent implements OnInit{
  constructor (private productService: ProductsService){

  }
  productList: Product[] = []
  saleProductList: Product[] = []
  displayProducts: Product[] = []

  private beauty:string[] = ['beauty', 'skin-care']
  private electronic:string[] = ['smartphones','mobile-accessories','tablets','laptops']
  private fashion: string[] = ['womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches','mens-shirts','mens-shoes','mens-watches']
  private furniture: string[] =['home-decoration','kitchen-accessories','groceries']
  private outdoor: string[] = ['vehicle', 'sports-accessories']
  
  private destroyRef = inject(DestroyRef)
  private cdr =  inject(ChangeDetectorRef)

  isShowAllActive = false
  isBeautyActive = false
  isElectronicActive = false
  isFacshionActive = false
  isFurnitureActive = false
  isOutdoorActive = false
  
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
    this.filterProduct('all')
    this.cdr.detectChanges()
  }
  filterProduct(selection: string)
  {
    switch(selection)
    {
      case 'beauty':
        this.displayProducts = [...this.saleProductList].filter(product => this.beauty.includes(product.category))
        this.isBeautyActive = true
        this.isShowAllActive = false
        this.isElectronicActive = false
        this.isFacshionActive = false
        this.isFurnitureActive = false
        this.isOutdoorActive = false
        break;
      case 'electronic':
        this.displayProducts = [...this.saleProductList].filter(product => this.electronic.includes(product.category))
        this.isElectronicActive = true
        this.isShowAllActive = false
        this.isBeautyActive = false
        this.isFacshionActive = false
        this.isFurnitureActive = false
        this.isOutdoorActive = false
        break;
      case 'fashion':
        this.displayProducts = [...this.saleProductList].filter(product => this.fashion.includes(product.category))
        this.isFacshionActive = true
        this.isShowAllActive = false
        this.isBeautyActive = false
        this.isElectronicActive = false
        this.isFurnitureActive = false
        this.isOutdoorActive = false
        break;
      case 'furniture':
        this.displayProducts = [...this.saleProductList].filter(product => this.furniture.includes(product.category))
        this.isFurnitureActive = true
        this.isShowAllActive = false
        this.isBeautyActive = false
        this.isElectronicActive = false
        this.isFacshionActive = false
        this.isOutdoorActive = false
        break;
      case 'outdoor':
        this.displayProducts = [...this.saleProductList].filter(product => this.outdoor.includes(product.category))
        this.isOutdoorActive = true
        this.isShowAllActive = false
        this.isBeautyActive = false
        this.isElectronicActive = false
        this.isFacshionActive = false
        this.isFurnitureActive = false
        break;
      case 'all':
        this.displayProducts = [...this.saleProductList]
        this.isShowAllActive = true
        this.isBeautyActive = false
        this.isElectronicActive = false
        this.isFacshionActive = false
        this.isFurnitureActive = false
        this.isOutdoorActive = false
        break;
      default:
        this.displayProducts = [...this.saleProductList]
        this.isShowAllActive = true
        this.isBeautyActive = false
        this.isElectronicActive = false
        this.isFacshionActive = false
        this.isFurnitureActive = false
        this.isOutdoorActive = false
        break;
    }
  }
}
