import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService,private ngxSpinnerService: NgxSpinnerService, private alertifyService: AlertifyService) { 
    super(ngxSpinnerService);
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement){
    this.showSpinner(SpinnerTypes.BallAtom);
    const create_product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerTypes.BallAtom);
      this.alertifyService.message("Product created successfully", MessageType.Success);
    }, errorMessage => {
      this.hideSpinner(SpinnerTypes.BallAtom);
      this.alertifyService.message(errorMessage, MessageType
      .Error);
    });
  }

}
