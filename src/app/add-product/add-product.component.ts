import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CategorieProduit } from '../model/categorie.model';
import { CategorieProduitService } from '../core/services/categorie-produit.service';
import { ProduitService } from '../core/services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  categories!: CategorieProduit[];
  id!: number;
  nomProduit!: string;
  productForm: FormGroup = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    categorie: new FormControl('', [Validators.required]),
    quantite: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]'),
    ]),
    prix: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]'),
    ]),
    image: new FormControl(null, [
      Validators.required,
      this.fileTypeValidator(['image/png', 'image/jpeg', 'image/gif']),
    ]),
  });
  constructor(
    private cs: CategorieProduitService,
    private ps: ProduitService,
    private ac: ActivatedRoute,
    private router: Router
  ) {
    this.cs.getCategorie().subscribe({
      next: (data) => (this.categories = data),
      error: (e) => alert(e.message),
    });
    this.id = this.ac.snapshot.params['id'];
    if (this.id) {
      this.ps.getProduct(this.id).subscribe({
        next: (data) => {
          this.nomProduit = data.nomProduit;
          this.productForm.patchValue({
            nom: data.nomProduit,
            description: data.descriptionProduit,
            quantite: data.quantite,
            prix: data.prix,
            categorie: data.categorie.nomCategorie,
            image: data.image,
          });
          console.log(data.categorie.nomCategorie);
        },
        error: (e) => alert(e.message),
      });
    }
  }

  // event: The event object passed to the method.
  // target: Refers to the element that triggered the event (in this case, the file input element).
  // files: A FileList object containing the list of files selected by the user.
  // [0]: Index to access the first file in the FileList.
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        image: file,
      });
    }
  }
  fileTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file: File = control.value;

      if (file) {
        const fileType = file.type;

        if (!allowedTypes.includes(fileType)) {
          return { fileType: true };
        }
      }

      return null;
    };
  }
  addProduct() {
    const product = new FormData();
    product.append(
      'nomProduit',
      this.productForm.get('nom')!.value.toLowerCase()
    );

    product.append('categorie', this.productForm.get('categorie')!.value._id);
    product.append('quantite', this.productForm.get('quantite')!.value);
    product.append('prix', this.productForm.get('prix')!.value);
    product.append(
      'descriptionProduit',
      this.productForm.get('description')!.value
    );
    product.append('image', this.productForm.get('image')!.value);

    product.forEach((value, key) => {
      console.log(key, value);
    });
    this.ps.addProduct(product).subscribe({
      next: (d) => {
        console.log(d);
        this.productForm.reset();
      },
      error: (e) => alert(e.message),
    });
  }
  getMessage() {
    return this.id != undefined ? 'Update le produit' : 'Ajouter le produit ';
  }
  title() {
    return this.id != undefined
      ? `Update Le Produit ${this.nomProduit}`
      : 'Ajouter Un Nouveau Produit ';
  }
  goBack() {
    this.router.navigate(['list-products']);
  }
}
