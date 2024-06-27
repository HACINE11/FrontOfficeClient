import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categorieclient } from 'src/app/model/categorieclient';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/core/services/client.service';
import { CategorieClientService } from 'src/app/core/services/categorie-client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  client!: Client;
  listCatClient!: Categorieclient[];
  statuslist = ['inactif'];
  niveauSatisfaction = ['0']; 
  idc!: string;
  c!: Client;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private ccs: CategorieClientService,
    private ar: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      addressePostal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      telPortable: ['', [Validators.required, Validators.pattern(/^\+\d{1,3}\d{4,14}(?:x\d+)?$/)]],
      telFixe: ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      matriculeFiscale: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      dateInscription: ['', Validators.required],
      chiffreAffaire: ['', [Validators.required, Validators.min(0)]],
      niveauSatisfaction: ['0', [Validators.required, Validators.min(0), Validators.max(5)]],
      statutCompte: ['', Validators.required],
      region: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      pointFidelite: [100],
      categorieClientId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idc = this.ar.snapshot.params['id'];

    if (this.idc) {
      this.clientService.getClientById(this.idc).subscribe({
        next: (client) => {
          this.c = client;
          this.clientForm.patchValue(this.c);
        },
        error: (error) => {
          alert('Erreur lors de la récupération du client : ' + error.message);
        }
      });
    }

    this.ccs.getcategorieclients().subscribe({
      next: (categories) => {
        this.listCatClient = categories.filter(cat => cat.libelleCatCl === 'Devenir client');
      },
      error: (error) => {
        alert('Erreur lors de la récupération des catégories : ' + error.message);
      }
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      if (this.idc) {
        this.clientService.updateClient(this.idc, this.clientForm.value).subscribe({
          next: () => {
            alert('Client mis à jour avec succès');
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du client', error);
          }
        });
      } else {
        this.clientService.addClient(this.clientForm.value).subscribe({
          next: () => {
            alert('Devenir client ajouté avec succès');
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du Devenir client', error);
          }
        });
      }
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}