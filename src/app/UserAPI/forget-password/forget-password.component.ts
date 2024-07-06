import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  loading = false;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  forgetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const { email } = this.forgetPasswordForm.value;
      this.loading = true;
      this.message = null;

      this.authService.forgetPassword(email).subscribe(result => {
        this.loading = false;
        this.message = result.message;
        this.messageType = result.isOk ? 'success' : 'error';
      }, error => {
        this.loading = false;
        this.message = 'An error occurred. Please try again later.';
        this.messageType = 'error';
      });
    }
  }
}

