import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  user: Partial<User> = {
    nom: '',
    prenom: '',
    entreprise: '',
    address: '',
    mobile: undefined
  };
  idUser!: string;
  loading = false;

  constructor(
    private authService: AuthServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('tokenClient');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.idUser = decoded.id;

        this.authService.getUserProfile(this.idUser).subscribe(data => {
          this.user = {
            nom: data.nom,
            prenom: data.prenom,
            entreprise: data.entreprise,
            address: data.address,
            mobile: data.mobile
          };
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }

  updateUser() {
    this.loading = true;
    this.authService.updateUserProfile(this.idUser, this.user).subscribe(
      data => {
        this.loading = false;
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error => {
        this.loading = false;
        console.error('Error updating profile:', error);
        this.snackBar.open('Error updating profile', 'Close', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}

/*export class ProfilComponent implements OnInit{
  
    user:Partial <User>= {};
    colCountByScreen: object;
    idUser!: string;
    loading = false;
    snackBar: any;
    formGroup: {

    }
  
    constructor(private authService: AuthServiceService) {
      this.colCountByScreen = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4
      };
    }
  
    ngOnInit(): void {
      const token = localStorage.getItem('tokenClient');
  
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          this.idUser = decoded.id;
          
  
          this.authService.getUserProfile(this.idUser).subscribe(data => {
            this.user= {
  
              nom:data.nom,
              prenom: data.prenom,
              entreprise: data.entreprise,
              address: data.address,
              mobile: data.mobile
            }
             //console.log('affiche PROFILE USER', this.user);
          });
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.log('No token found');
      }
    }
  
    updateUser() {
      this.loading = true;
      this.authService.updateUserProfile(this.idUser, this.user).subscribe(
        data => {
          this.loading = false;
          // Afficher le message de succès
          this.snackBar.open('Profile updated successfully', 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
        },
        error => {
          this.loading = false;
          console.error('Error updating profile:', error);
          // Afficher le message d'erreur
          this.snackBar.open('Error updating profile', 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }*/
  