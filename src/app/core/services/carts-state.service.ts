import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { isPlatformBrowser} from '@angular/common'



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
  products: Product[],
  total: number,
  totalProducts: number,
  totalQuantity: number,
}

@Injectable({providedIn:'root'})

export class CartStateService
{
    cartSubject = new BehaviorSubject<Cart|null>(null)
    $cart = this.cartSubject.asObservable()

      constructor( @Inject(PLATFORM_ID) private plaformId: Object)
      {
        this.loadCart()
      }
    private loadCart()
    {
        if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        const savedCart = localStorage.getItem('Cart')
        if (!savedCart)
        {
            return
        }
        this.cartSubject.next(JSON.parse(savedCart))
    }

    getCart()
    {
        return this.cartSubject.value
    }
    
    setCart(cart: Cart)
    {
         if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        localStorage.setItem('Cart', JSON.stringify(cart))
        this.cartSubject.next(cart)
    }

    addItemToCart(product: Product)
    {
          if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        this.cartSubject.value?.products.push(product)
        this.updateCartStatus()
        localStorage.setItem('Cart', JSON.stringify(this.cartSubject.value))
    }

    removeItem(id: number)
    {
       if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        const newCart = this.cartSubject.value
        if (newCart)
        {
            newCart.products = newCart.products.filter(product=> product.id!== id)
            this.cartSubject.next({...newCart})
        }
        this.updateCartStatus()
        localStorage.setItem('Cart', JSON.stringify(this.cartSubject.value))
    }

    updateCartStatus()
    {
        let total = 0
        let totalProduct = 0
        let totalQuantity = 0
        this.cartSubject.value?.products.forEach((product: Product) =>
        {
            total += product.total
            totalQuantity += product.quantity
            totalProduct ++
        }) 
        const newCart = this.cartSubject.value
        if (newCart)
        {
            newCart.total = total
            newCart.totalProducts = totalProduct
            newCart.totalQuantity =  totalQuantity
            this.cartSubject.next({...newCart})
        }
    }

    updateProductQuantity(id: number, quantity: number)
    {
         if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        const currentProduct = this.cartSubject.value
        if (currentProduct)
        {
           const updatedProduct = currentProduct.products.map(
            product =>
            {
                if (product.id ===id)
                {
                    return {...product, quantity: quantity}
                }
                return product
            }
           )
           this.cartSubject.next({...currentProduct, products: updatedProduct})
           this.updateCartStatus()
           localStorage.setItem('Cart', JSON.stringify(this.cartSubject.value))
        }
    }

    removeCart()
    {
         if (!isPlatformBrowser(this.plaformId))
        {
            return
        }
        this.cartSubject.next(null)
        localStorage.removeItem('Cart')
    }
}