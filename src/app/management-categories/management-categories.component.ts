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
  alert = 0;
  message: string = '';
  displayedColumns: string[] = [
    'Categorie',
    'description',
    'update',
    'details',
    'actions',
  ];
  dataSource = new MatTableDataSource<CategorieProduit>();

  constructor(private cs: CategorieProduitService) {
    this.refresh();
  }

  showCategorie() {
    this.toggle = !this.toggle;
  }
  addCategorie(c: CategorieProduit) {
    this.cs.addCategorie(c).subscribe({
      next: (d: any) => {
        this.message = d.message;
        this.alert = 1;
        setTimeout(() => this.refresh(), 1000);
      },
      error: (e) => {
        this.message = e.message;
        this.alert = 2;
      },
    });
  }
  refresh() {
    this.cs.getCategories().subscribe({
      next: (d) => {
        this.dataSource.data = d;
        this.categories = d;
      },
      error: (e) => alert(e.message),
    });
  }
  deleteCategorie(id: number) {
    this.cs.deleteCategorie(id).subscribe({
      next: (d: any) => {
        this.message = 'delete successfuly';
        this.alert = 1;
        console.log(this.categories);
        this.categories = this.categories.filter((cat) => cat._id != id);
        this.dataSource.data = this.categories;
        console.log(this.categories);
      },
      error: (e) => {
        this.message = e.message;
        this.alert = 2;
      },
    });
  }
}
