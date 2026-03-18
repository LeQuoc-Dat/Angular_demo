import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, forkJoin, map} from 'rxjs'
import { Product } from '../../shared/models/carts.model'

interface requestObj {
    products: any[]
    limit: number
    skip: number
    total: number
}

@Injectable ({
        providedIn: 'root'
    })

export class ProductsService {
    private cartsURL = 'https://dummyjson.com/carts'
    private productURL = 'https://dummyjson.com/products'

    constructor (private http: HttpClient){}

    public loadAllProduct():Observable<any>{
        return this.http.get(`${this.productURL}?limit=0&delay=1000`)
    }
    
    public loadCarts():Observable<any>{
        return this.http.get(`${this.cartsURL}?limit=30&delay=1000`)
    }

    public loadProductByCategory(categoriesList:string[]):Observable<any[]>{
        const requestList$: Observable<requestObj>[]= categoriesList.map(category => this.http.get<requestObj>(`${this.productURL}/category/${category}`))
        return forkJoin(requestList$).pipe(
            map( res => res.flatMap(item => item.products))
        )}

    public getProductByID(productID: number): Observable<any>{
        return this.http.get(`${this.productURL}/${productID}`

        )}

    public addProductToCart(cartID:number, product: Product){
        return this.http.put(`${this.cartsURL}/${cartID}`,{
          merge: 'true',
          products: [product]
        })
    }

    public updateProductStatus(cartID:number, products: Product[]){
      console.log(`${this.cartsURL}/${cartID}`)
      return this.http.put(`${this.cartsURL}/${cartID}`, {
        merge: 'false',
        products: products
      })
    }
}