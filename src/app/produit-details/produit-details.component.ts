import { Component } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../core/services/produit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produit-details',
  templateUrl: './produit-details.component.html',
  styleUrls: ['./produit-details.component.css'],
})
export class ProduitDetailsComponent {
  produit!: Produit;
  quantite!: number;
  id!: number;
  constructor(private ps: ProduitService, private ac: ActivatedRoute) {
    this.id = this.ac.snapshot.params['idProduit'];
    this.ps.getProduct(this.id).subscribe({
      next: (data) => {
        this.produit = data;
        console.log(data);
      },
      error: (e) => alert(e.message),
    });
  }
}
