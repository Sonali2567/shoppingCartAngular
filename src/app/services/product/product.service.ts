import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient) {}
    getAllProducts(){
      return this.http.get('Constant.API_END_POINT+Constant.METHODS.GET_ALL_PRODUCT');
        }  
}
