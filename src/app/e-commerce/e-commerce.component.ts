import { AfterViewInit, Component } from '@angular/core';
import { CategorieProduit } from '../model/categorie.model';
import { CategorieProduitService } from '../core/services/categorie-produit.service';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css'],
})
export class ECommerceComponent {
  categories: CategorieProduit[] = [];
  constructor(private cs: CategorieProduitService) {
    this.cs.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (e) => alert(e.message),
    });
  }
}
