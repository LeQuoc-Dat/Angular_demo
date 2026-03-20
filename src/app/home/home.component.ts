import { Component, OnInit, DestroyRef, inject, ChangeDetectorRef} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductsService} from '../core/services/products.service'
import { takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { IconList} from '../core/components/icon-list'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartStateService as CartState} from '../core/states/carts.state'
import { EMPTY, switchMap, take, tap } from 'rxjs';
import { Product} from '../shared/models/products.model'

enum CategoryType {
  Beauty = 'beauty',
  Electronic = 'electronic',
  Fashion = 'fashion',
  Furniture = 'furniture',
  Outdoor = 'outdoor',
}

@Component({
  selector: 'app-home',
  imports: [RouterModule, FontAwesomeModule, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../layout/main-layout/main-layout.component.css'],
})

export class HomeComponent implements OnInit {
  constructor(private products: ProductsService,
    private cartState: CartState,
    private router: Router
  )
  {

  }

  public iconList = inject(IconList)

  private destroyRef = inject(DestroyRef)
  private cdr =  inject(ChangeDetectorRef)

  private beauty:string[] = ['beauty', 'skin-care']
  private electronic:string[] = ['smartphones','mobile-accessories','tablets','laptops']
  private fashion: string[] = ['womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches','mens-shirts','mens-shoes','mens-watches']
  private furniture: string[] =['home-decoration','kitchen-accessories','groceries']
  private outdoor: string[] = ['vehicle', 'sports-accessories']

  isEditing:boolean = false
  cartsList = []
  productsList: Product[] = []
  featuredProductList: Product[] = []
  bestSellerProductList: Product[] = []
  dealOfTheDayProductList: Product[] = []
  newestProductList: Product[] = []
  chosenProduct: Product = {id: -1, title: '', description:'', category:'',
    price:0,discountPercentage:0.00, rating:0, reviews:[],tags: [], images: [], thumbnail:'',
    meta: {
      createdAt:'',
      updatedAt:'',
      barcode:'',
      qrCode:'',
      
    },
    stock: 0, minimumOrderQuantity: 0,
    availabilityStatus: ''
  }

  ngOnInit(): void {
    this.loadProductsList()
  }


  loadProductsList():void
  {
     this.products.loadAllProduct().pipe(takeUntilDestroyed(this.destroyRef)).subscribe
    (
      {
        next: (res) =>
        {
          this.productsList = res.products
          this.loadCartsList()
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
    this.products.loadCarts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe
    (
      {
        next: (res) =>
        {
          this.cartsList = res.carts
          this.loadDealOfTheDayProduct()
          this.loadFeaturedProduct()
          this.loadBestSellerProduct()
          this.loadNewestProduct()
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
    ).slice(0, 2)


    this.featuredProductList = [...this.productsList].filter(cart => sortProduct.includes(cart.id))
    this.cdr.detectChanges()
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
    ).slice(0, 2)
    this.bestSellerProductList = [...this.productsList].filter((product)=> sortProduct.includes(product.id))
    this.cdr.detectChanges()
  }

  loadNewestProduct():void
  {
    this.newestProductList = [...this.productsList].sort((a, b) =>
      new Date(b.meta.createdAt).getDate() - new Date(a.meta.createdAt).getDate()
  ).slice(0,4)
    this.cdr.detectChanges()
  }

  loadDealOfTheDayProduct():void
  {
    this.dealOfTheDayProductList = [...this.productsList].sort((a,b) =>
    (b.discountPercentage) - (a.discountPercentage)).slice(0,2)
    this.cdr.detectChanges()
  }


  onCartClick(productID:number):void
  {
    this.products.getProductByID(productID).subscribe(
      {
        next: (res) =>
        {
          this.chosenProduct = res
          console.log(this.chosenProduct)
          this.updateProdustsCart(this.chosenProduct)

        },
        error: (err) =>
        {
          console.error(err.message)
        }
      }
    )
  }


  async updateProdustsCart(product: Product) {
    this.cartState.cart$.pipe(
      take(1),
      switchMap(cart => {
        if (!cart){
            return EMPTY
          }
        if(cart?.products.map(p => p.id).includes(product.id)){
            this.cartState.productQuantityIncr(product.id)
            return this.products.updateProductStatus(cart.id, cart.products)
        }
        const newProduct = {
              id: product.id,
              title: product.title,
              quantity: 1,
              price: product.price,
              discountPercentage: product.discountPercentage,
              total: product.price,
              discountedTotal: product.price - product.price*product.discountPercentage/100,
              thumbnail: product.thumbnail
            }
        return this.products.addProductToCart( cart.id ,newProduct).pipe(
          tap( () => this.cartState.addItemToCart(newProduct))
        )

      })
    ).subscribe(
      {
        next: (res) =>
        {
        },
        error: (err)=>
        {
        }
      }
    )
  }

  onProductClick(productID:number, productName:string, productCategory:string):void{
    const categoryMap: Record<CategoryType, string[]> = {
        [CategoryType.Beauty]: this.beauty,
        [CategoryType.Electronic]: this.electronic,
        [CategoryType.Fashion]: this.fashion,
        [CategoryType.Furniture]: this.furniture,
        [CategoryType.Outdoor]: this.outdoor,
    }
    const categoriesType = (Object.entries(categoryMap) as [CategoryType, string[]][])
    .find(([_, categories]) => categories.includes(productCategory))?.[0] ?? '';
    this.router.navigate([`/collections/`,categoriesType, productID, productName])
  }

   onCategoriesClick(categoryName: string)
  {
    if(categoryName==='')
    {
      this.router.navigate(['collections'])
    }
    else
    {
      this.router.navigate(['/collections', categoryName])
    }
  }
 

}
