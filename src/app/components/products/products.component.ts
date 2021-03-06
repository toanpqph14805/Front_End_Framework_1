import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: IProduct[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }
  delete(id: number) {
    const confirm = window.confirm("Bạn có muốn xóa?");
    if (confirm) {
      this.productService.removeProduct(id).subscribe(() => {
        this.products = this.products.filter(item => item.id !== id);
      })
    }
  }
  getProductList() {
    this.productService.productList().subscribe(data => {
      this.products = data;
    })
  }
}
