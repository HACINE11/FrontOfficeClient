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
    this.id = this.ar.snapshot.params['id'];
    this.productService.getAllProducts().subscribe({
      next: (d) => (this.products = d),
      error: (e) => alert(e.message),
    });
    if (this.id) {
      this.productService.getProductsByCategorieId(this.id).subscribe({
        next: (d) => (this.products = d),
        error: (e) => alert(e.message),
      });
    }
  }
  showProduct() {
    this.toggle = !this.toggle;
  }
}
