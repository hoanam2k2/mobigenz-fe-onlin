import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ManufacturerDto } from 'src/app/DTOs/ManufacturerDto';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = `${environment.baseUrl}/user`;
  constructor(private httpClient: HttpClient) {}
  getProducts(searchTerm?: string): Observable<[]> {
    return this.httpClient
      .get(
        `${environment.baseUrl}/admin/products/?searchTerm=${
          searchTerm ? searchTerm : ''
        }`
      )
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            return res.data.products;
          }
          return false;
        }),
        catchError(this.handleError<any>('Error get products', false))
      );
  }
  getManufacturers(): Observable<ManufacturerDto[]> {
    return this.httpClient.get(`${this.baseUrl}/manufacturers`).pipe(
      map((res: any) => {
        if (res.statusCode === 200) {
          return res.data.manufacturers;
        }
        return false;
      }),
      catchError(this.handleError<any>('Error get manufacturers', false))
    );
  }
  searchProductsShop(
    searchTerm?: string,
    min_price?: number,
    max_price?: number,
    manufacturerId?: number,
    sortPriceIncrease?: boolean
  ): Observable<[]> {
    return this.httpClient
      .get(
        `${environment.baseUrl}/user/searchProducts?searchTerm=${searchTerm}&min_price=${min_price}&max_price=${max_price}&manufacturer=${manufacturerId}&sortPriceIncrease=${sortPriceIncrease}`
      )
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            return res.data.products;
          }
          return false;
        }),
        catchError(this.handleError<any>('Error get products', false))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // this.message.error(operation);
      return of(result as T);
    };
  }
}
