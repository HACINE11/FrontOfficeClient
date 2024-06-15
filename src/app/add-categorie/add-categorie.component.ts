import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieProduitService } from '../core/services/categorie-produit.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css'],
})
export class AddCategorieComponent {
  categorieForm: FormGroup = new FormGroup({
    nomCategorie: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.pattern('[a-zAZ ]*'),
    ]),
    descriptionCategorie: new FormControl('', [
      Validators.required,
      Validators.min(5),
    ]),
  });
  alert = 0;
  message: string = '';
  id!: number;
  constructor(private cs: CategorieProduitService) {}
  addCategorie() {
    const categorie = {
      _id: 0,
      nomCategorie: this.categorieForm.get('nomCategorie')?.value,
      descriptionCategorie: this.categorieForm.get('descriptionCategorie')
        ?.value,
    };
    this.cs.addCategorie(categorie).subscribe({
      next: (d) => {
        console.log(d);
        this.message = `la categorie ${
          this.categorieForm.get('nomCategorie')?.value
        } has been successfully added `;
        this.alert = 1;
        this.categorieForm.reset();
      },
      error: (e) => {
        (this.message = e.message), (this.alert = 2);
      },
    });
  }
  getMessage() {
    return this.id != undefined
      ? 'Update la Categorie'
      : 'Ajouter la Categorie ';
  }
}
