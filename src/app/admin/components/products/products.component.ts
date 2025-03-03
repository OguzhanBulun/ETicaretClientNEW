import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent  implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.httpClientService.get({ controller: 'products' }) .subscribe(data => console.log(data));

    //test for post
    // this.httpClientService.post({ controller: 'products' }, { name: 'Product 1', price: 100, stock: 12 }) .subscribe();
    // this.httpClientService.post({ controller: 'products' }, { name: 'Product 2', price: 50, stock: 11 }) .subscribe();
    // this.httpClientService.post({ controller: 'products' }, { name: 'Product 3', price: 40, stock: 13 }) .subscribe();

    // this.httpClientService.put({controller: 'products',}, { id: "d79f573c-0d4e-4acc-953e-227cf2019abf",name: 'Değişen Product', price: 88, stock: 8 }) .subscribe();

    // this.httpClientService.delete({ controller: 'products' },"d79f573c-0d4e-4acc-953e-227cf2019abf") .subscribe();
  }

}
