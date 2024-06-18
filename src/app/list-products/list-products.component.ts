import { Component, ViewChild } from '@angular/core';
import { ProduitService } from '../core/services/produit.service';
import { FormControl } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { CategorieProduitService } from '../core/services/categorie-produit.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  products!: Produit[];
  displayedColumns: string[] = ['image', 'nom', 'quantite', 'prix', 'details'];
  idCategorie!: number;
  toggle = false;
  nomCategorie!: string;

  constructor(
    private productService: ProduitService,
    private ar: ActivatedRoute,
    private cs: CategorieProduitService
  ) {
    let url = this.ar.snapshot.params['id'];
    if (url) {
      let index = url.indexOf('-');
      this.idCategorie = url.slice(0, index);
    }

    if (this.idCategorie) {
      this.refraish();
      this.cs.getCategorieById(this.idCategorie).subscribe({
        next: (d) => (this.nomCategorie = d.nomCategorie),
        error: (e) => alert(e.message),
      });
    }
  }
  showProduct() {
    this.toggle = !this.toggle;
    console.log(this.toggle);
  }
  addProduct(produit: FormData) {
    this.productService.addProduct(produit).subscribe({
      next: (data) => {
        console.log(data);
        setTimeout(() => this.refraish(), 1000);
      },
      error: (err) => alert(err.message),
    });
  }
  refraish() {
    this.productService.getProductsByCategorieId(this.idCategorie).subscribe({
      next: (d) => (this.products = d),
      error: (e) => alert(e.message),
    });
  }
}
