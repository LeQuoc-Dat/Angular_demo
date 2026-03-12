import { Component, OnInit, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, ActivatedRoute} from '@angular/router'
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsService} from '../../../../../core/services/products.service'
import { Title } from '@angular/platform-browser';


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

interface Cart
{
  id: number,
  products: Product[]
}




@Component({
  selector: 'app-collections',
  imports: [RouterModule, DecimalPipe, FontAwesomeModule],
  templateUrl: './products-children.component.html',
  styleUrls: ['./products-children.component.css', '../../../../../layout/main-layout/main-layout.component.css'],
  providers: [Title]
})
export class ProductsChildrenComponent implements OnInit
{
  private beauty:string[] = ['beauty', 'skin-care']
  private electronic:string[] = ['smartphones','mobile-accessories','tablets','laptops']
  private fashion: string[] = ['womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches','mens-shirts','mens-shoes','mens-watches']
  private furniture: string[] =['home-decoration','kitchen-accessories','groceries']
  private outdoor: string[] = ['vehicle', 'sports-accessories']

  private destroyRef =  inject(DestroyRef)
  private cdr = inject(ChangeDetectorRef)
  private title = inject(Title)

  cartsList = []
  productsList:Product[] = []
  bestSellerProductList:Product[] = []
  breadcrumbText:string = ''
  trackbarText:string = ''
   

  backup = ['womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches','mens-shirts','mens-shoes','mens-watches']



  constructor (private productsService: ProductsService, private route: ActivatedRoute)
  {
     const categoryName = this.route.snapshot.paramMap.get('category')
     if(categoryName)
          {
            this.title.setTitle(this.upperFirstChartEachWord(categoryName))
          }
  }

  ngOnInit(): void {
    this.loadProduct(this.checkCategory())
    
  }

  upperFirstChartEachWord(text: string):string
  {
    const words = text.split(" ").map(word=> (word[0].toUpperCase() + word.slice(1))).join(" ")
    return words
  }

  checkCategory():string[]
  {
    const categoryName = this.route.snapshot.paramMap.get('category')
    var currentCategory: string[] = []
    if (!categoryName)
    {
      return currentCategory
    }
    this.trackbarText = this.upperFirstChartEachWord(categoryName)
    this.breadcrumbText = categoryName.toUpperCase()


    if (categoryName === 'beauty')
    {
      currentCategory = this.beauty 
    }
    if(categoryName === 'electronic')
    {
      currentCategory = this.electronic
    }
    if(categoryName ==='fashion')
    {
      currentCategory = this.fashion
    }
    if(categoryName ==='furniture')
    {
      currentCategory = this.furniture
    }
    if(categoryName ==='outdoor')
    {
      currentCategory = this.outdoor
    }

    return currentCategory
  }

  loadProduct(category: string[]):void
  {
    if(category.length===0)
    {
      return
    }
    this.productsService.loadProductByCategory(category).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      {
        next: (res) =>
        {
          this.productsList = res
          this.loadCartsList()
          this.cdr.detectChanges()
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
    this.productsService.loadCarts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe
    (
      {
        next: (res) =>
        {
          this.cartsList = res.carts
          this.loadBestSellerProduct()
          this.cdr.detectChanges()
        },
        error: (err)=>
        {
          console.error(err.message)
        }

      }
    )
  }

  loadBestSellerProduct()
  {
     const productMap = new Map<number, { title: string ,quantity:number}>
    this.cartsList.forEach((cart:Cart) =>
    {
      cart.products.filter(product => this.productsList.map(data=>data.id).includes(product.id)).forEach((product: any) =>
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
    ).slice(0, 3)
    this.bestSellerProductList = [...this.productsList].filter((product)=> sortProduct.includes(product.id))
    this.cdr.detectChanges()
  }


}
