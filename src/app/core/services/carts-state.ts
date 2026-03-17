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
  id: number,
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
    public cart$ = this.cartSubject.asObservable()

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
            total += product.discountedTotal
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
                    const updateTotal= product.price*quantity
                    const updatedDiscountedToTal =  (product.price - product.price*product.discountPercentage/100)*quantity
                    return {...product, quantity: quantity, total: updateTotal, discountedTotal: updatedDiscountedToTal}
                }
                return product
            }
           )
           this.cartSubject.next({...currentProduct, products: updatedProduct, })
           this.updateCartStatus()
           localStorage.setItem('Cart', JSON.stringify(this.cartSubject.value))
        }
    }

    productQuantityIncr(id: number)
    {
      const productIndex = this.cartSubject.value?.products.findIndex(product => product.id === id )
      if (!productIndex)
      {
        return
      }
      const currentQuantity = this.cartSubject.value?.products[productIndex].quantity
      if (!currentQuantity)
      {
        return
      }
      this.updateProductQuantity(id, currentQuantity + 1)
    }
    productQuantityDecr(id: number)
    {
       const productIndex = this.cartSubject.value?.products.findIndex(product => product.id === id )
      if (!productIndex)
      {
        return
      }
      const currentQuantity = this.cartSubject.value?.products[productIndex].quantity
      if (!currentQuantity)
      {
        return
      }
      this.updateProductQuantity(id, currentQuantity - 1)
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
