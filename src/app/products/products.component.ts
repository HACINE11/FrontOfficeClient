import { Component } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../core/services/produit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  produits!: Produit[];
  id!: number;
  constructor(private ps: ProduitService, private ar: ActivatedRoute) {
    this.id = this.ar.snapshot.params['id'];
    this.ps.getProductsByCategorieId(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.produits = data;
      },
      error: (e) => alert(e.message),
    });
  }
}
