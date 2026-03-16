import { Component, OnInit, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, ActivatedRoute, Router} from '@angular/router'
import { CurrencyPipe, NgStyle, NgClass } from '@angular/common';
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
  availabilityStatus: string,
}

interface Cart
{
  id: number,
  products: Product[]
}



@Component({
  selector: 'app-products',
  imports: [RouterModule, CurrencyPipe, FontAwesomeModule, NgStyle, NgClass],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css', '../../../../../layout/main-layout/main-layout.component.css'],
  providers: [Title]
})
export class ProductDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  )
  {
    const setTitle = this.route.snapshot.paramMap.get('name')
    if (setTitle)
    {
      this.title.setTitle(setTitle)
    }
  }

  private cdr = inject(ChangeDetectorRef)
  private destroyRef = inject(DestroyRef)
  private title = inject(Title)

  private beauty:string[] = ['beauty', 'skin-care']
  private electronic:string[] = ['smartphones','mobile-accessories','tablets','laptops']
  private fashion: string[] = ['womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches','mens-shirts','mens-shoes','mens-watches']
  private furniture: string[] =['home-decoration','kitchen-accessories','groceries']
  private outdoor: string[] = ['vehicle', 'sports-accessories']

  product: Product| null = null
  cartsList: Cart[] =[]
  productsList: Product[] = []
  bestSellerProductList: Product[] = []
  quantity: number = 1
  productImg: string =""
  isDetailsToggled: boolean = false
  isReviewToggled: boolean = false


  ngOnInit(): void 
  {
    this.loadProduct()
  }

  loadProduct(): void
  {
    const userID = Number(this.route.snapshot.paramMap.get('id'))
    this.productsService.getProductByID(userID).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      {
        next: (res) =>
        {
          this.product = res
          if (this.product)
          {
              this.onImgClick(this.product?.images[0])
              this.onTabbarToggle("")
          }
          this.loadProductsList(this.checkCategory())
          this.cdr.detectChanges()
        },
        error: (err) =>
        {
          console.error(err.message)
        }
      }
    )
  }

  upperFirstChartEachWord(text: string):string
  {
    const words = text.split(" ").map(word=> (word[0].toUpperCase() + word.slice(1))).join(" ")
    return words
  }
  onImgClick(img: string)
  {
    this.productImg = img
  }
  onTabbarToggle(tabbarName: string)
  {
    switch(tabbarName)
    {
      case "details":
        this.isDetailsToggled = true
        this.isReviewToggled = false
        break

      case "reviews":
        this.isReviewToggled = true
        this.isDetailsToggled = false
        break

      default:
        this.isDetailsToggled = true
        this.isReviewToggled = false
        break
    }
  }

    checkCategory():string[]
  {
    const categoryName = this.product?.category
    console.log(categoryName)
    var currentCategory: string[] = []
    if (!categoryName)
    {
      return currentCategory
    }

    if (this.beauty.includes(categoryName))
    {
      currentCategory = this.beauty 
    }
    if(this.electronic.includes(categoryName))
    {
      currentCategory = this.electronic
    }
    if(this.fashion.includes(categoryName))
    {
      currentCategory = this.fashion
    }
    if(this.furniture.includes(categoryName))
    {
      currentCategory = this.furniture
    }
    if(this.outdoor.includes(categoryName))
    {
      currentCategory = this.outdoor
    }

    return currentCategory
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

   loadProductsList(category: string[]):void
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

    onProductClick(productID:number, productName:string, productCategory:string):void
  {
    let categoriesType = ""
    if (this.beauty.includes(productCategory))
    {
      categoriesType = 'beauty'
    }
    if (this.electronic.includes(productCategory))
    {
      categoriesType = 'electronic'
    }
    if (this.fashion.includes(productCategory))
    {
      categoriesType = 'fashion'
    }
    if (this.furniture.includes(productCategory))
    {
      categoriesType = 'furniture'
    }
    if (this.outdoor.includes(productCategory))
    {
      categoriesType = 'outdoor'
    }
    console.log(productID, productName, categoriesType)
    this.router.navigate([`/collections/`,categoriesType, productID, productName])
  }

}
