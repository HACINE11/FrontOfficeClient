import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.signupForm = this.fb.group({
      nom: [''],
      prenom: [''],
      entreprise: [''],
      matriculeFiscal: [''],
      email: ['', [Validators.required, Validators.email]],
      motPasse: ['', [Validators.required, ]],
      address: [''],
      mobile: [''],
      role: ['']
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      this.authService.signUp(signupData).subscribe(
        response => {
          console.log('Inscription réussie : ', response);
          this.router.navigate(['/home']); // Redirigez vers /home après une inscription réussie
        },
        error => {
          console.error('Erreur d\'inscription : ', error);
          // Ajoutez ici la gestion des erreurs, par exemple, affichage d'un message d'erreur
        }
      );
    } else {
      console.log('Formulaire non valide');
    }
  }

}
