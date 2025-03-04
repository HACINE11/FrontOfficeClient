import { Component, ViewChild } from '@angular/core';
import { ProduitService } from '../core/services/produit.service';
import { FormControl } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieProduitService } from '../core/services/categorie-produit.service';
import { CategorieProduit } from '../model/categorie.model';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  products!: Produit[];
  displayedColumns: string[] = ['image', 'nom', 'quantite', 'prix', 'details'];
  idCategorie!: number;
  idProduit!: number;
  toggle = false;
  nomCategorie!: string;
  alert = 0;
  message: string = '';
  constructor(
    private productService: ProduitService,
    private ar: ActivatedRoute,
    private cs: CategorieProduitService,
    private router: Router
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
  update(id: number, produit: FormData) {
    console.log(id);
    console.log('aaaaaaaaaanisssssssss');
    this.productService.updateProduct(id, produit).subscribe({
      next: (d) => {
        this.alert = 1;
        this.message = 'product update successfully';

        this.router.navigate([
          '/management-categorie',
          this.idCategorie + '-' + this.nomCategorie,
        ]);
      },
      error: (e) => {
        this.alert = 2;
        this.message = e.message;
      },
    });
  }
  addProduct(produit: FormData) {
    this.productService.addProduct(produit).subscribe({
      next: (data) => {
        this.message = `${produit.get('nomProduit')} added successfully`;
        this.alert = 1;
        console.log(data);
        setTimeout(() => this.refraish(), 1000);
      },
      error: (err) => {
        this.message = err.message;
        this.alert = 2;
      },
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (d) => {
        this.alert = 1;
        this.message = 'product deleted successfully';
        this.products = this.products.filter((produit) => produit._id != id);
      },
      error: (e) => {
        this.alert = 2;
        this.message = e.message;
      },
    });
  }

  refraish() {
    this.productService.getProductsByCategorieId(this.idCategorie).subscribe({
      next: (d) => (this.products = d),
      error: (e) => alert(e.message),
    });
  }
  getIdProduct(id: number) {
    console.log('id nekho fi');
    console.log(id);
    this.idProduit = id;
  }
}
