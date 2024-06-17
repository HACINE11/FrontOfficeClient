import { Component } from '@angular/core';
import { CategorieProduit } from '../model/categorie.model';
import { CategorieProduitService } from '../core/services/categorie-produit.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-management-categories',
  templateUrl: './management-categories.component.html',
  styleUrls: ['./management-categories.component.css'],
})
export class ManagementCategoriesComponent {
  categories!: CategorieProduit[];
  toggle = false;
  displayedColumns: string[] = [
    'Categorie',
    'description',
    'details',
    'actions',
  ];
  dataSource = new MatTableDataSource<CategorieProduit>();

  constructor(private cs: CategorieProduitService) {
    this.cs.getCategories().subscribe({
      next: (d) => (this.dataSource.data = d),
      error: (e) => alert(e.message),
    });
  }

  showCategorie() {
    this.toggle = !this.toggle;
  }
}
