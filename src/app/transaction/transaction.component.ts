import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CartService } from '../core/services/cart.service';
import { Carte } from '../model/carte.model';
import { ProduitService } from '../core/services/produit.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  products: Produit[] = [];
  idClient!: number;
  idProducts!: number[];
  cart!: Carte;
  constructor(private cartService: CartService, private pc: ProduitService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('tokenClient');

    if (token) {
      const decoded: any = jwtDecode(token);
      this.idClient = decoded.id;
    }
    this.loadCart();
  }
  loadCart() {
    this.cartService.getTransaction(this.idUser).subscribe({
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
