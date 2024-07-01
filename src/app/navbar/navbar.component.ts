import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { Carte } from '../model/carte.model';
import { Produit } from '../model/produit.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  cart!: Carte; // Assurez-vous que le type Carte correspond à votre modèle
  idClient: number = 2; // Remplacez par l'identifiant réel du client
  products: Produit[] = []; //
  filtre: any[] = [];

  tokenClient!: string | null;

  constructor(private router: Router, private cs: CartService) {}
  ngOnInit(): void {

    this.tokenClient = localStorage.getItem("tokenClient");
    
    this.countPanier();
    this.cs.cartUpdated$.subscribe(() => {
      this.countPanier();
    });
  }
  nvaigateToPanier() {
    this.router.navigate(['/panier']);
  }
  countPanier() {
    this.cs.getpanier(this.idClient).subscribe({
      next: (data: Carte) => {
        this.cart = data;
        this.filtre = data.items;
        console.log(this.filtre);
      },
      error: (e) => alert(e.message),
    });
  }

  login(): void {
    this.router.navigate(['/login-form']);
  }

  signup(): void {
    this.router.navigate(['/signup']);
  }

  logout(): void {
    // Implement your logout logic here
    localStorage.removeItem("tokenClient");
    this.router.navigate(['/logout']);
    window.location.reload();
  }
}
