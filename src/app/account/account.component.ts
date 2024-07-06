import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
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
          console.log("data :: ", data, "/n", decoded);
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
