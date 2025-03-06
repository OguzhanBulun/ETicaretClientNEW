import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product : Create_Product, successCallback?: () => void, errorCallback?: (errorMessage: string) => void){
    this.httpClientService.post({controller: 'products'}, product).
    subscribe((data) => {
        successCallback();
        alert('Product created successfully');
      },
      (errorResponse: HttpErrorResponse) => {
      const _error: Array<{key:string, value: Array<string>}>= errorResponse.error;
      let errorMessage = '';
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            errorMessage += `${_v} <br>`;
          });
      });
      errorCallback(errorMessage);
    });
  }

  async get(page: number = 0, size: number = 5, successCallback?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{totalCount: number, products: List_Product[]}>{
    const promiseData : Promise<{totalCount: number, products: List_Product[]}> = 
    this.httpClientService.get<{totalCount: number, products: List_Product[]}>({controller:'products',queryString: `page=${page}&size=${size}`}).toPromise()

    promiseData.then(d => successCallback())
    .catch((errorResponse: HttpErrorResponse) => {
      if (errorCallback) errorCallback(errorResponse.error);
    });

    return await promiseData;
  }

  async delete(id: string, successCallback?: () => void, errorCallback?: (errorMessage: string) => void){
    const deleteObservable: Observable<any> =this.httpClientService.delete<any>({controller: 'products'}, id);

    await firstValueFrom(deleteObservable);
  }
}