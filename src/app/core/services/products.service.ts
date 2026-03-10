import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable} from 'rxjs'


@Injectable(
    {
        providedIn: 'root'
    }
    
)

export class ProductsService
{
    private allProductURL = 'https://dummyjson.com/products?limit=0&delay=1000'
    private cartsURL = 'https://dummyjson.com/carts?limit=30&delay=1000'
    private categoriesURL = 'https://dummyjson.com/products/categories'
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
    public loadCategories():Observable<any>
    {
        return this.http.get(this.categoriesURL)
    }
}
