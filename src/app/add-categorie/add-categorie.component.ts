import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieProduitService } from '../core/services/categorie-produit.service';
import { CategorieProduit } from '../model/categorie.model';
import { ActivatedRoute, Router } from '@angular/router';

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
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    descriptionCategorie: new FormControl('', [
      Validators.required,
      Validators.min(5),
    ]),
  });
  alert = 0;
  message: string = '';
  id!: number;
  @Output() categorie = new EventEmitter<CategorieProduit>();
  constructor(
    private cs: CategorieProduitService,
    private ac: ActivatedRoute,
    private route: Router
  ) {
    this.id = this.ac.snapshot.params['idCategorie'];
    if (this.id) {
      this.cs.getCategorieById(this.id).subscribe({
        next: (data) => {
          this.categorieForm.patchValue({
            nomCategorie: data.nomCategorie,
            descriptionCategorie: data.descriptionCategorie,
          });
        },
        error: (e) => alert(e.message),
      });
    }
  }

  addCategorie() {
    const categorie = {
      _id: 0,
      nomCategorie: this.categorieForm.get('nomCategorie')?.value,
      descriptionCategorie: this.categorieForm.get('descriptionCategorie')
        ?.value,
    };
    this.categorie.emit(categorie);
    this.categorieForm.reset();
    if (this.id) {
      this.cs.updateCategorie(this.id, categorie).subscribe({
        next: (d) => {
          this.alert = 1;
          this.message = 'categorie update successfully';
          this.route.navigate(['management-categorie']);
        },
        error: (e) => {
          this.alert = 2;
          this.message = e.message;
        },
      });
    }
  }
  getMessage() {
    return this.id != undefined
      ? 'Update la Categorie'
      : 'Ajouter la Categorie ';
  }
}
