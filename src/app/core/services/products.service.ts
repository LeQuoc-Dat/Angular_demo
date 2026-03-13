import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, forkJoin, map} from 'rxjs'


interface requestObj
{
    products: any[]
    limit: number
    skip: number
    total: number
}

interface Product
{
  id: number,
  title: string,
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string,
}

@Injectable(
    {
        providedIn: 'root'
    }

)


export class ProductsService
{
    private allProductURL = 'https://dummyjson.com/products?limit=0&delay=1000'
    private cartsURL = 'https://dummyjson.com/carts'
    private categoriesURL = 'https://dummyjson.com/products/category/'
    private productURL = 'https://dummyjson.com/products'
    constructor (private http: HttpClient)
    {
    }
    public loadAllProduct():Observable<any>
    {
        return this.http.get(this.allProductURL)
    }
    public loadCarts():Observable<any>
    {
        return this.http.get(`${this.cartsURL}?limit=30&delay=1000`)
    }
    public loadProductByCategory(categoriesList:string[]):Observable<any[]>
    {
        const requestList$: Observable<requestObj>[]= categoriesList.map(category => this.http.get<requestObj>(`${this.categoriesURL}${category}`))
        return forkJoin(requestList$).pipe(
            map( res => res.flatMap(item => item.products))
        )
    }

    public getProductByID(productID: number): Observable<any>
    {
        return this.http.get(`${this.productURL}/${productID}`)
    }
    public addProductToCart(cartID:number, product: Product)
    {
        return this.http.put(`${this.cartsURL}/${cartID}`,{
          merge: 'true',
          products: [product]
        })
    }
    public updateProductStatus(cartID:number, products: Product[])
    {
      console.log(`${this.cartsURL}/${cartID}`)
      return this.http.put(`${this.cartsURL}/${cartID}`, {
        merge: 'false',
        products: products
      })
    }
}
