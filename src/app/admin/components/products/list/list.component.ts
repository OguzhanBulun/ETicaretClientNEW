import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const products: List_Product[] = [];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'stock']; // Kolon isimleri burada tanımlandı
  dataSource = new MatTableDataSource(products);

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.get<List_Product[]>({controller:'products'}).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  
}
