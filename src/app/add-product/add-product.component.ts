import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  categoriesProduit!: CategorieProduit[];
  id!: number;
  @Input() idCategorie!: number;
  @Output() productAdded = new EventEmitter<FormData>();
  @Output() emitProduct: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() emitId: EventEmitter<number> = new EventEmitter<number>();
  categorie!: CategorieProduit;
  nomProduit!: string;
  productForm: FormGroup = new FormGroup({
    nomProduit: new FormControl('', [
      Validators.required,
      //Validators.minLength(3),
      //Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    descriptionProduit: new FormControl('', [
      Validators.required,
      //Validators.minLength(5),
      //Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    categorie: new FormControl('', [Validators.required]),
    quantite: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      //Validators.pattern('[0-9]'),
    ]),
    prix: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      //Validators.pattern('[0-9]'),
    ]),
    image: new FormControl(null),
  });
  constructor(
    private cs: CategorieProduitService,
    private ps: ProduitService,
    private ac: ActivatedRoute,
    private router: Router
  ) {
    let urlCategorie = this.ac.snapshot.params['id'];
    if (urlCategorie) {
      let index = urlCategorie.indexOf('-');
      this.idCategorie = urlCategorie.slice(0, index);
    }
    if (this.idCategorie) {
      this.cs.getCategorieById(this.idCategorie).subscribe({
        next: (categorie) => {
          this.categorie = categorie;

          console.log(this.categorie);
        },
        error: (err) => alert(err),
      });
    }
    let url = this.ac.snapshot.params['idProduit'];
    let urlCat = this.ac.snapshot.params['idCategorie'];
    if (url) {
      let index = url.indexOf('-');
      this.id = url.slice(0, index);
      let indexCategorie = urlCat.indexOf('-');
      this.idCategorie = urlCat.slice(0, indexCategorie);
    }

    if (this.id) {
      this.cs.getCategorieById(this.idCategorie).subscribe({
        next: (categorie) => {
          this.categorie = categorie;

          console.log(this.categorie);
        },
        error: (err) => alert(err),
      });

      this.ps.getProductById(this.id).subscribe({
        next: (data) => {
          this.categorie = data.categorie;
          this.nomProduit = data.nomProduit;
          this.productForm.patchValue({
            nomProduit: data.nomProduit,
            descriptionProduit: data.descriptionProduit,
            quantite: data.quantite,
            prix: data.prix,
            categorie: data.categorie.nomCategorie,
            image: data.image,
          });
          //console.log(data.categorie.nomCategorie);
        },
        error: (e) => alert(e.message),
      });
    }
  }

  // event: The event object passed to the method.
  // target: Refers to the element that triggered the event (in this case, the file input element).
  // files: A FileList object containing the list of files selected by the user.
  // [0]: Index to access the first file in the FileList.
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        this.productForm.get('image')?.setErrors({ fileType: true });
      } else {
        this.productForm.patchValue({
          image: file,
        });
      }
    }
  }

  addProduct() {
    const product = new FormData();
    product.append(
      'nomProduit',
      this.productForm.get('nomProduit')!.value.toLowerCase()
    );

    product.append('categorie', this.productForm.get('categorie')!.value);
    product.append('quantite', this.productForm.get('quantite')!.value);
    product.append('prix', this.productForm.get('prix')!.value);
    product.append(
      'descriptionProduit',
      this.productForm.get('descriptionProduit')!.value
    );
    product.append('image', this.productForm.get('image')!.value);

    product.forEach((value, key) => {
      console.log(key, value);
    });
    if (this.id == undefined) {
      this.productForm.reset();
    }

    this.productAdded.emit(product);
    if (this.id) {
      this.ps.updateProduct(this.id, product).subscribe({
        next: (d) => {
          // this.alert = 1;
          // this.message = 'product update successfully';

          this.router.navigate(['/management-categorie']);
        },
        error: (e) => {
          alert(e.message);
        },
      });
    }
  }
  getMessage() {
    return this.nomProduit != undefined
      ? 'Update le produit'
      : 'Ajouter le produit ';
  }
  title() {
    return this.nomProduit != undefined
      ? `Update Le Produit ${this.nomProduit}`
      : 'Ajouter Un Nouveau Produit ';
  }
}
