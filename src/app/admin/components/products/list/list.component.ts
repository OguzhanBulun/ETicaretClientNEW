import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/product.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate'];
  dataSource : MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClientService: HttpClientService, private productService: ProductService, ngxSpinner: NgxSpinnerService, private alertifyService: AlertifyService) { 
    super(ngxSpinner);
  }

  async getProducts(){
    this.showSpinner(SpinnerTypes.BallAtom);
    const productData: {totalCount: number, products: List_Product[]} = await this.productService.get(this.paginator ?  this.paginator.pageIndex : 0, this.paginator? this.paginator.pageSize : 5,
      () => {this.hideSpinner(SpinnerTypes.BallAtom)},
     errorMessage => {
      this.alertifyService.message(errorMessage.length > 0 ? errorMessage : "Unexpected Error Occured!", MessageType.Error);
      this.hideSpinner(SpinnerTypes.BallAtom);
    })

    this.dataSource = new MatTableDataSource<List_Product>(productData.products);
    this.paginator.length = productData.totalCount; 
  }

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit(): Promise<void> {
   await this.getProducts();
  }
}
