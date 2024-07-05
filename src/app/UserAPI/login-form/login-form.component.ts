import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent{

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private router:Router,  private auth:AuthServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motPasse: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.auth.logIn(loginData.email, loginData.motPasse).subscribe(
        response => {
        // console.log('Connexion réussie : ', response);
        localStorage.setItem("tokenClient", response.token);
        
        
        this.router.navigate(['/home']);
        },
        error => {
          console.error('Erreur de connexion : ', error);
          // Ajoutez ici la gestion des erreurs, par exemple, affichage d'un message d'erreur
        }
      );
    } else {
      
        console.log('Formulaire non valide !!');
    }
}



}

export class LoginFormModule { }


