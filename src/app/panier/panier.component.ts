import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carte } from '../model/carte.model';
import { CartService } from '../core/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../core/services/produit.service';
import { Produit } from '../model/produit.model';
import { AuthServiceService } from '../services/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  idClient!: number;
  products: Produit[] = [];
  cart!: Carte;
  idProducts: number[] = [];
  grandTotal: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private pc: ProduitService,
    private router: Router,
    private auth: AuthServiceService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('tokenClient');

    if (token) {
      const decoded: any = jwtDecode(token);
      this.idClient = decoded.id;
    }
    this.loadCart();
    this.calculateTotal();
  }
  updatePanier(idProduit: number) {
    this.cartService
      .updatePanier({ idClient: this.idClient, idProduit: idProduit })
      .subscribe({
        next: (data) => {
          this.products = this.products.filter((p) => p._id != idProduit);
          this.calculateTotal();
          console.log(this.products);
        },
        error: (e) => {
          alert(e.message);
        },
      });
  }
  calculateTotal(): void {
    this.cart.totalAmount = this.cart.items.reduce(
      (sum, item) => sum + item.product.prix * item.quantity,
      0
    );
  }

  loadCart() {
    this.cartService.getpanier(this.idClient).subscribe({
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
  confirmPurchase() {
    console.log(this.cart);
    this.cartService.confirmPurchase({ carte: this.cart }).subscribe({
      next: (data: any) => {
        if (data.erreur) {
          alert(data.erreur);
        } else {
          alert(data.message);
        }
        this.router.navigate(['transaction']);
      },
      error: (e) => alert(e.message),
    });
  }
  deletePanier() {
    this.cartService.deletePanier(this.idClient).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['home']);
      },
      error: (e) => alert(e.message),
    });
  }

  onQuantityChange(idProduit: number, newQuantity: number) {
    const item = this.cart.items.find((item) => item.product._id === idProduit);
    if (item) {
      item.quantity = newQuantity;
      this.calculateTotal();
    }
  }
}
