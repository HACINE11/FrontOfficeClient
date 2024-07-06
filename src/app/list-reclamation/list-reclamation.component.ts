import { Component, OnInit } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit{

  listReclamations: Reclamation[] = [];

  idUser: string = "";

  ngOnInit(): void {
    const token = localStorage.getItem('tokenClient');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.idUser = decoded.id;
      }catch (error) {
        console.error('Error decoding token:', error);
      }
      
      console.log("id useer :: ", this.idUser);
      this.reclamationService.getReclamationById(this.idUser).subscribe(
        (data: Reclamation[]) => {
          this.listReclamations = data;
        },
        error => {
          console.error('Error fetching reclamations', error);
        }
    );
    }


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
