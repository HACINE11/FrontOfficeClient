import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  onSatisfied() {
    // Handle satisfied logic here
    alert("Thank you for your feedback! You are satisfied.");
    this.close();
  }

  onUnsatisfied() {
    // Handle unsatisfied logic here
    alert("Thank you for your feedback! You are unsatisfied.");
    this.close();
  }

  
}
