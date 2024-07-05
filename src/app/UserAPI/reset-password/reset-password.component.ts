import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  resetPasswordForm: FormGroup;
  recoveryCode: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.fb.group({
      motPasse: ['', [Validators.required,]],    //Validators.minLength(6)
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.recoveryCode = this.route.snapshot.paramMap.get('token');
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('motPasse')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { motPasse } = this.resetPasswordForm.value;
      this.loading = true;

      if (this.recoveryCode !== null) {
        this.authService.changePassword(this.recoveryCode, motPasse).subscribe(result => {
          this.loading = false;
          if (result.isOk) {
            this.router.navigate(['/login-form']);
            this.snackBar.open(result.message, 'Close', { duration: 2500, panelClass: ['success-snackbar'] });
          } else {
            this.snackBar.open(result.message, 'Close', { duration: 2000, panelClass: ['error-snackbar'] });
          }
        }, error => {
          this.loading = false;
          this.snackBar.open('An error occurred. Please try again later.', 'Close', { duration: 2000, panelClass: ['error-snackbar'] });
        });
      } else {
        this.loading = false;
        this.snackBar.open('Recovery code is missing.', 'Close', { duration: 2000, panelClass: ['error-snackbar'] });
      }
    }
  }
}