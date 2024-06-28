import { Component, EventEmitter, Output } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();


  constructor(
    private reclamationService:     ReclamationService,
    private activatedRoute:         ActivatedRoute,
    private router:                 Router
  ){}



  close() {
    this.closeModal.emit();
  }

  
  onSatisfied() {
    // Handle satisfied logic here
    alert("Thank you for your feedback! You are satisfied.");

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(id);

    if (id) {
      let obj = { satisfaction: "1" };
      this.reclamationService.onSatGreen(id, obj).subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['/listRec']);
        },
        error => {
          console.log('Error', error);
        }
      );
    } else {
      console.error('ID parameter is missing');
    }
    this.close();
  }

  onUnsatisfied() {
    // Handle unsatisfied logic here
    alert("Thank you for your feedback! You are unsatisfied.");
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(id);

    if (id) {
      let obj = { satisfaction: "-1" };
      this.reclamationService.onSatRed(id, obj).subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['/listRec']);
        },
        error => {
          console.log('Error', error);
        }
      );
    } else {
      console.error('ID parameter is missing');
    }
    this.close();
  }

  
}
