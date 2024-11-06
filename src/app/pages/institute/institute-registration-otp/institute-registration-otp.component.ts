import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InstituteRegistrationComponent } from '../institute-registration/institute-registration.component';
import swal from 'sweetalert2';
import { Hearder1Component } from "../../../common/headers/hearder-1/hearder-1.component";

@Component({
  selector: 'app-institute-registration-otp',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, Hearder1Component],
  templateUrl: './institute-registration-otp.component.html',
  styleUrl: './institute-registration-otp.component.css'
})
export class InstituteRegistrationOtpComponent {
  public otp: any = "";
  private institute: any;

  constructor(private router: Router, private http: HttpClient) {
    const institute = localStorage.getItem('instituteData');
    if (institute) {
      this.institute = JSON.parse(institute);
    }
  }

  validateOtp() {
    if (Number(this.otp) === Number(InstituteRegistrationComponent.getOTP())) {
      try {
        this.http.post("http://localhost:8080/institutes/register", this.institute).subscribe();
        localStorage.removeItem('instituteData');
        this.alertMessage("Institute Registered Successfully","success");
        this.router.navigate(['']);
      } catch(error) {
        this.alertMessage("Something went wrong", "error");
      }
    } else {
      this.alertMessage("Invalid OTP", "error");
    }
  }

  public alertMessage(title: string, icon: any) {
    swal.fire({
      title: title,
      icon: icon,
      denyButtonText: "OK",
    });
  }
}
