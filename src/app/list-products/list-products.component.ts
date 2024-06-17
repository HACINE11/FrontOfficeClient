import { Component, ViewChild } from '@angular/core';
import { ProduitService } from '../core/services/produit.service';
import { FormControl } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  products!: Produit[];
  displayedColumns: string[] = ['image', 'nom', 'quantite', 'prix', 'details'];
  id!: number;
  toggle = false;
  constructor(
    private productService: ProduitService,
    private ar: ActivatedRoute
  ) {
    const url = this.ar.snapshot.params['id'];
    const index = url.indexOf('-');
    this.id = url.slice(0, index);
    if (this.id) {
      this.refraish();
    }
  }
  showProduct() {
    this.toggle = !this.toggle;
  }
  addProduct(produit: FormData) {
    this.productService.addProduct(produit).subscribe({
      next: (data) => {
        setTimeout(() => this.refraish(), 1000);
      },
      error: (err) => alert(err.message),
    });
  }
  refraish() {
    this.productService.getProductsByCategorieId(this.id).subscribe({
      next: (d) => (this.products = d),
      error: (e) => alert(e.message),
    });
  }
}
