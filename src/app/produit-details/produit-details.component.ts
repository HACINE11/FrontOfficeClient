import { Component } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../core/services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { CategorieProduit } from '../model/categorie.model';

@Component({
  selector: 'app-produit-details',
  templateUrl: './produit-details.component.html',
  styleUrls: ['./produit-details.component.css'],
})
export class ProduitDetailsComponent {
  produit!: Produit;
  quantite!: number;
  idUser = 2;
  id!: number;
  arrayIdProduit: number[] = [];
  arrayidUser: number[] = [];
  arrayQuantite: number[] = [];
  constructor(
    private ps: ProduitService,
    private ac: ActivatedRoute,
    private cs: CartService,
    private router: Router
  ) {
    let url = this.ac.snapshot.params['idProduit'];
    console.log(this.arrayIdProduit);
    if (url) {
      let index = url.indexOf('-');
      this.id = url.slice(0, index);

      this.ps.getProductById(this.id).subscribe({
        next: (data) => {
          this.produit = data;
        },
        error: (e) => alert(e.message),
      });
    }
  }
  addToCart(): void {
    this.cs
      .addProduct({
        idUser: this.idUser,
        idProduit: this.id,
        quantity: this.quantite,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['panier']);
        },
        error: (e) => alert(e.message),
      });
  }
}
