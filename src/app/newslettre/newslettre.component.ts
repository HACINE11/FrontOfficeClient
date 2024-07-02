import { Component } from '@angular/core';

@Component({
  selector: 'app-newslettre',
  templateUrl: './newslettre.component.html',
  styleUrls: ['./newslettre.component.css']
})
export class NewslettreComponent {
  email: string = '';

    subscribe() {
        console.log('Adresse e-mail souscrite:', this.email);
    }

}
