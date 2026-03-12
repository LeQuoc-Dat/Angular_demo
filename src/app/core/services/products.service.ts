import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable, forkJoin, map} from 'rxjs'
import { response } from 'express'


interface requestObj
{
    products: any[]
    limit: number
    skip: number
    total: number
}

@Injectable(
    {
        providedIn: 'root'
    }
    
)


export class ProductsService
{
    private allProductURL = 'https://dummyjson.com/products?limit=0&delay=1000'
    private cartsURL = 'https://dummyjson.com/carts?limit=30&delay=1000'
    private categoriesURL = 'https://dummyjson.com/products/category/'
    constructor (private http: HttpClient)
    {
    }
    public loadAllProduct():Observable<any>
    {
        return this.http.get(this.allProductURL)
    }
    public loadCarts():Observable<any>
    {
        return this.http.get(this.cartsURL)
    }
    public loadProductByCategory(categoriesList:string[]):Observable<any[]>
    {
        const requestList$: Observable<requestObj>[]= categoriesList.map(category => this.http.get<requestObj>(`${this.categoriesURL}${category}`))
        return forkJoin(requestList$).pipe(
            map( res => res.flatMap(item => item.products))
        )
    }
}
