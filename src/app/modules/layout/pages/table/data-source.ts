import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

import { Product } from "src/app/models/product.model";

export class ProductsDataSource extends DataSource<Product> {

  data = new BehaviorSubject<Product[]>([]);
  originalData: Product[] = [];

  override connect(): Observable<Product[]> {
    return this.data;
  }

  init(products: Product[]) {
    this.originalData = products;
    this.data.next(products);
  }

  getTotal() {
    const products = this.data.getValue();
    return products.reduce((subTotal, product) => subTotal += product.price, 0);
  }

  update({ id, changes }: { id: Product['id'], changes: Partial<Product> }) {
    const products = this.originalData;
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...changes,
      };
    }
    this.originalData = products;
    this.data.next(products);
  }

  filter(query: string) {
    const filteredProducts = this.originalData.filter(product =>
      product.id.toString().includes(query) ||
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.price.toString().includes(query)
    );
    this.data.next(filteredProducts);
  }

  override disconnect(): void { }

}
