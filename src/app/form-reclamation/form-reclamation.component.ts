import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReclamationService } from '../services/reclamation.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Reclamation } from '../models/reclamation';
import { CategorieReclamation } from '../models/categorie-reclamation';

@Component({
  selector: 'app-form-reclamation',
  templateUrl: './form-reclamation.component.html',
  styleUrls: ['./form-reclamation.component.css']
})
export class FormReclamationComponent implements OnInit{
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
  reclamationForm: FormGroup = new FormGroup({});
  imageFile: File | null = null;
  selectedDescription: string | null = null;
  idClient: string = "6664c89c481c7a4da8a41750";

  notesReclamation!: string;
  messageNotification!: string;
  green!: string;
  buttonResolved!: boolean;

  imagePreviewUrl: string | null = null;

  titlePage: string = "";

  reclamation!: Reclamation;

  listCategorie: CategorieReclamation[] = [];

  categorieId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ){}

  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      category: ['', Validators.required],
      image: []
    });

    this.titlePage = "Request your Reclamation";

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    

    if(id) {
      
      this.titlePage = "Update your Reclamation";

      this.reclamationService.getReclamationByIdRec(id).subscribe((data: Reclamation) => {

      // Check if there are any notes
      if (data.notes && data.notes.trim() !== "0") {
        
        this.messageNotification = "You have new modification on your Reclamation";
        this.notesReclamation = data.notes;
        this.green = "green-border";
        
      }

      if(data.statut_rec === "resolved" && data.satisfaction == "0") {
        this.buttonResolved = true; 

      }

        this.populateForm(data);
        this.imagePreviewUrl = data.image;
      });
          
    }

    this.reclamationService.getCategorieRec().subscribe((data) => {
        this.listCategorie = data;
    });
  }

  takeSurvey(){

  }
  

    // Getters for form controls
    get title() { return this.reclamationForm.get('title'); }
    get description() { return this.reclamationForm.get('description'); }
    get priority() { return this.reclamationForm.get('priority'); }
    get category() { return this.reclamationForm.get('category'); }
  
    populateForm(reclamation: Reclamation): void {
      if (this.title) this.title.setValue(reclamation.title);
      if (this.description) this.description.setValue(reclamation.description);
      if (this.priority) this.priority.setValue(reclamation.priorite);
      if (this.category) this.category.setValue(reclamation.idCategorieReclamation);
    }



  onResidenceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.categorieId = selectElement.value;
    const selectedCategory = this.listCategorie.find(categorie => categorie._id === this.categorieId);
    this.selectedDescription = selectedCategory ? selectedCategory.description : null;
  
  }
  

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageFile = file;
      this.reclamationForm.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    if (this.reclamationForm.valid) {
      
      const formData = new FormData();

      formData.append('title', this.reclamationForm.get('title')?.value);
      formData.append('description', this.reclamationForm.get('description')?.value);
      formData.append('priorite', this.reclamationForm.get('priority')?.value);
      formData.append('statut_rec', "new");
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      formData.append('idCategorieReclamation', this.reclamationForm.get('category')?.value);
      formData.append('idClient', this.idClient);
      formData.append('notes', "0");
      formData.append('satisfaction', "0");
      formData.append('notification', "0");


      /*formData.forEach((value, key) => {
        console.log(value, "//", key);
      });*/

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if(id){

          this.reclamationService.updateReclamation(formData, id).subscribe(() => {
            this.router.navigate(['/listRec']);
          },
        error => {
          console.error('Error creating reclamation', error);
        }
        );
      } else {
        this.reclamationService.addReclamation(formData).subscribe(
          () => {
            this.router.navigate(['/listRec']);
          },
          error => {
            console.error('Error creating reclamation', error);
          }
        );
      }


    }
  }
}