import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hearder1Component } from '../headers/hearder-1/hearder-1.component';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { error, log } from 'node:console';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, Hearder1Component],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  institutes: any[] = [];
  students: any[] = [];
  teachers: any[] = [];
  constructor(private http: HttpClient,private router: Router) {
    this.http.get('http://localhost:8080/institutes/all').subscribe(res => this.institutes = res as any[]);
    this.http.get('http://localhost:8080/students/all').subscribe(res => this.students = res as any[]);
    this.http.get('http://localhost:8080/teachers/all').subscribe(res => this.teachers = res as any[]);
  }

  continueToOTP() {
    if (this.validateForm()) {
      if(this.username.charAt(0) === 'I'){
        const institute = this.institutes.find((inst: any) => inst.id === this.username);
        if (institute != null) {
          this.http.patch(`http://localhost:8080/institutes/${institute.id}/updatePassword`,this.newPassword).subscribe({
            next:(response)=>{
              this.alertMessage('Password updated successfully', 'success');
              this.router.navigate(['/']);
            },
            error:(error)=>{
              this.alertMessage('Error updating password: ' + error.message, 'error');
            }
          })
        } else {
          this.alertMessage('Invalid username for institute', 'error');
        }
      }else if(this.username.charAt(0) === 'S'){
        const student = this.students.find((st: any) => st.id === this.username);
        if (student != null) {
          this.http.patch(`http://localhost:8080/students/${student.id}/updatePassword`, this.newPassword).subscribe({
            next: (response) => {
              this.alertMessage('Password updated successfully', 'success');
              this.router.navigate(['/']);
            },
            error: (error) => {
              this.alertMessage('Error updating password: ' + error.message, 'error');
            }
          })
        } else {
          this.alertMessage('Invalid username for student', 'error');
        }
      }else if(this.username.charAt(0) === 'T'){
        const teacher = this.teachers.find((t: any) => t.id === this.username);
        if (teacher != null) {
          this.http.patch(`http://localhost:8080/teachers/${teacher.id}/updatePassword`, this.newPassword).subscribe({
            next: (response) => {
              this.alertMessage('Password updated successfully', 'success');
              this.router.navigate(['/']);
            },
            error: (error) => {
              this.alertMessage('Error updating password: ' + error.message, 'error');
            }
          })
        } else {
          this.alertMessage('Invalid username for teacher', 'error');
        }
      }else{
        this.alertMessage('Invalid username','error')
      }
    }
  }

  private validateForm(): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.username == '') {
      this.alertMessage('Username is required', 'error');
      return false;
    }
    if (!passwordPattern.test(this.newPassword)) {
      this.alertMessage('Password is Invalid','error');
      return false;
    }
    if (!this.newPassword) {
      this.alertMessage('New password is required', 'error');
      return false;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.alertMessage('Passwords do not match', 'error');
      return false;
    }
    return true;
  }
  private alertMessage(message: string, icon: any ) {
    swal.fire({
      title: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
