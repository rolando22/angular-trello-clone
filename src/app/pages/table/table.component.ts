import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ProductsDataSource } from './data-source';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  dataSource = new ProductsDataSource();
  total = 0;
  columns: string[] = ['id', 'title', 'price', 'cover', 'actions'];
  seacherInput = new FormControl('', { nonNullable: true });

  constructor(
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.productsService.getAll()
      .subscribe(data => {
        this.dataSource.init(data);
        this.total = this.dataSource.getTotal();
      });

    this.seacherInput.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => this.dataSource.filter(value));
  }

  updateProduct(product: Product) {
    this.dataSource.update({ id: product.id, changes: { price: 50 } });
    this.total = this.dataSource.getTotal();
  }

}
