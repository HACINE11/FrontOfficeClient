import { Component, OnInit } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.scss']
})
export class ListReclamationComponent implements OnInit{

  listReclamations: Reclamation[] = [];

  idClient: string = "6664c89c481c7a4da8a41750";

  ngOnInit(): void {
      this.reclamationService.getReclamationById(this.idClient).subscribe(
        (data: Reclamation[]) => {
          this.listReclamations = data;
        },
        error => {
          console.error('Error fetching reclamations', error);
        }
    );
  }

constructor(  
  private reclamationService: ReclamationService,
  private router: Router
) {}

onRowClick(id: string): void {
    this.router.navigate(['/edit', id]);
}

deleteApartment(id: string){
  alert("do you want to delete this reclamation");
  
  this.reclamationService.deleteReclamation(id).subscribe(() => {
    this.listReclamations = this.listReclamations.filter(item => item._id !== id);
    this.router.navigate(['/listRec']);

  });


}

}
