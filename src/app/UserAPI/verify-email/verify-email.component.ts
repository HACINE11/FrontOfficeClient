import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  formData: any = {};
  loading = false;

  constructor( private auth:AuthServiceService, private router: Router){}

  onsubmit (){
    const { email, code } = this.formData;
    this.loading = true;

    this.auth.verifyAccount(email, code).subscribe(result => {
      this.loading = false;
      if (result.isOk) {
        console.log('Account verified successfully', 'success', 2000);
        this.router.navigate(['/login-form']);
      } else {
        console.log(result.message, 'error', 2000);
      }
    });
  }

}
