import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css'],
})
export class CategorieDetailsComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['management-categorie']);
  }
}
