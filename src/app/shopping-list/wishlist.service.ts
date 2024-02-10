import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
// import { map } from 'rxjs';
// import { map } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { map } from 'rxjs/internal/operators/map';




@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  readonly recipesAPIUrl = "https://localhost:7240/api";
  
  constructor(private http: HttpClient) { }

  // getWishList(){
  //   return this.http.get(this.recipesAPIUrl).pipe(
  //     map((result: any[]) => {
  //       let recipesIds: any[] = []

  //       result.forEach(item => recipesIds.push(item.id))

  //       return recipesIds;
  //     })
  //   )
  // }

  // getWishlist() {
  //   return this.http.get(this.recipesAPIUrl).pipe(
  //     map((result: any[]) => {
  //       let productIds: any[] = []

  //       result.forEach(item => productIds.push(item.id))

  //       return productIds;
  //     })
  //   )
  // }

  addToWishList(productId: any){
    return this.http.post(this.recipesAPIUrl + '/wishlist', {id: productId})
  }

  removeFromWishList(productId: any){
    return this.http.delete(this.recipesAPIUrl + '/wishlist/' + productId)
  }
}
