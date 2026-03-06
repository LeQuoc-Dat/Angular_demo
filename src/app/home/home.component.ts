import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService} from '../core/services/products.service'



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
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../layout/main-layout/main-layout.component.css'],
})

export class HomeComponent {
  constructor(private products: ProductsService)
  {
    
  }
  cartsList = []
  productsList: Product[] = []
  featuredProductList: Product[] = []
  bestSellerProductList: Product[] = []
  dealOfTheDayProductList: Product[] = []
  newestProductList: Product[] = []

  ngOnInit(): void {
    
    this.loadProductsList()
    this.loadCartsList()
    this.loadFeaturedProduct()
    this.loadBestSellerProduct()
    //console.log(this.bestSellerProductList)
    //console.log(this.featuredProductList)
    this.loadNewestProduct()
   
  }

  async loadProductsList()
  {
     this.products.loadAllProduct().subscribe
    (
      {
        next: (res) =>
        {
          this.productsList = res.products
        },
        error: (err) =>
        {
          console.error(err.message)
        }
      }
    )
  }


  loadCartsList():void
  {
    this.products.loadCarts().subscribe
    (
      {
        next: (res) =>
        {
          this.cartsList = res.carts
        },
        error: (err)=>
        {
          console.error(err.message)
        }

      }
    )
  }

  loadFeaturedProduct():void
  {
    const productMap = new Map<number, { title: string ,count:number}>
    this.cartsList.forEach((cart:any) =>
    {
      cart.products.forEach((product: any) =>
      {
        if (productMap.has(product.id))
        {
            const existing = productMap.get(product.id)!;
            existing.count++;
        }
        else
        {
          productMap.set(product.id,
            {
              title: product.title,
              count: 1
            }
          )
        }
      })
    })

    const sortProduct =  [...productMap.entries()].sort((a, b) => b[1].count - a[1].count).map(
      ([id, data ]) => id
    ).slice(0, 8)


    this.featuredProductList = this.productsList.filter(cart => sortProduct.includes(cart.id))
  }

  loadBestSellerProduct():void
  {
    const productMap = new Map<number, { title: string ,quantity:number}>
    this.cartsList.forEach((cart:any) =>
    {
      cart.products.forEach((product: any) =>
      {
        if (productMap.has(product.id))
        {
            const existing = productMap.get(product.id)!;
            existing.quantity = existing.quantity + product.quantity
        }
        else
        {
          productMap.set(product.id,
            {
              title: product.title,
              quantity: product.quantity
            }
          )
        }
      })
    })

    const sortProduct =  [...productMap.entries()].sort((a, b) => b[1].quantity - a[1].quantity).map(
      ([id, data ]) => id
    ).slice(0, 8)
    this.bestSellerProductList = this.productsList.filter((product)=> sortProduct.includes(product.id))
  }

  loadNewestProduct():void
  {
    this.newestProductList = this.productsList.sort((a, b) => 
      new Date(b.meta.createdAt).getDate() - new Date(a.meta.createdAt).getDate()
  ).slice(0,8)
  }

}
