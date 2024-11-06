import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hearder1Component } from '../headers/hearder-1/hearder-1.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterModule, Hearder1Component],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  continueToOTP() {
      this.router.navigate(['/change-password/confirm']);
  }

  private validateForm(): boolean {
    if (!this.username) {
      this.showError('Username is required');
      return false;
    }
    if (!this.newPassword) {
      this.showError('New password is required');
      return false;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.showError('Passwords do not match');
      return false;
    }
    return true;
  }

  private showError(message: string) {
    swal.fire({
      title: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
