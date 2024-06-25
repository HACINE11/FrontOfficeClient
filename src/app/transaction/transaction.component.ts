import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CartService } from '../core/services/cart.service';
import { Carte } from '../model/carte.model';
import { ProduitService } from '../core/services/produit.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  products: Produit[] = [];
  idClient = 2;
  idProducts!: number[];
  cart!: Carte;
  constructor(private cartService: CartService, private pc: ProduitService) {}
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {
    this.cartService.getTransaction(this.idClient).subscribe({
      next: (data: Carte) => {
        this.cart = data;
        this.idProducts = data.items.map((item) => item.product._id);

        this.idProducts.forEach((id) => {
          this.pc.getProductById(id).subscribe({
            next: (produit: Produit) => {
              this.products.push(produit);
            },
            error: (err) => {
              alert(err.message);
            },
          });
        });
      },
      error: (e) => alert(e.message),
    });
  }
}
