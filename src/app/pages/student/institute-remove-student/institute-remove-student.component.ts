import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../../common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-institute-remove-student',
  standalone: true,
  imports: [FooterComponent,InstituteNavbarComponent,FormsModule,CommonModule],
  templateUrl: './institute-remove-student.component.html',
  styleUrl: './institute-remove-student.component.css'
})
export class InstituteRemoveStudentComponent {
  public ConfirmPassword: string = '';
  public isSearched: Boolean = false;
  public instituteId: string = '';
  public searchedStudentId: string = '';
  public student: any = {
    id:'',
    firstName: '',
    lastName: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    password: '',
  };
  constructor(private router: Router, private http: HttpClient) {
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.instituteId = LoggedUser.id;
  }
  public cancel() {
    this.student = {
      firstName: '',
      lastName: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
      password: '',
    };
    this.isSearched = false;
    this.ConfirmPassword = '';
  }
  private validateStudent(): boolean {
    const contactPattern = /^0[0-9]{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.isSearched) {
      if (this.student.firstName == '') {
        this.alertMessage('First Name is Required', 'error');
        return false;
      }
      if (this.student.lastName == '') {
        this.alertMessage('Last Name is Required', 'error');
        return false;
      }
        if (this.student.contact == '') {
        this.alertMessage('Contact is Required', 'error');
        return false;
      }
      if (this.student.email == '') {
        this.alertMessage('Email is Required', 'error');
        return false;
      }
      if (this.student.address == '') {
        this.alertMessage('Address is Required', 'error');
        return false;
      }
      if (this.student.password == '') {
        this.alertMessage('Password is Required', 'error');
        return false;
      }
      if (this.ConfirmPassword == '') {
        this.alertMessage('Confirm Password is Required', 'error');
        return false;
      }
      if (this.student.password != this.ConfirmPassword) {
        this.alertMessage(
          'Password and Confirm Password does not match',
          'error'
        );
        return false;
      }
      if (!contactPattern.test(this.student.contact)) {
        this.alertMessage('Contact Number is Invalid', 'error');
        return false;
      }
      if (!emailPattern.test(this.student.email)) {
        this.alertMessage('Email Address is Invalid', 'error');
        return false;
      }
      if (!passwordPattern.test(this.student.password)) {
        this.alertMessage('Password is Invalid', 'error');
        return false;
      }
      return true;
    } else {
      if (this.isSearched) {
        return true;
      } else {
        this.alertMessage('Please search student first', 'error');
        return false;
      }
    }
  }
  public searchStudent() {
    if (this.searchedStudentId === '') {
      this.alertMessage('Invalid Student Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/students/search/${this.searchedStudentId}`)
        .subscribe((res: any) => {
          if (res) {
            this.student.id = res.id;
            this.student.firstName = res.firstName;
            this.student.lastName = res.lastName;
            this.student.dob = res.dob;
            this.student.contact = res.contact;
            this.student.email = res.email;
            this.student.address = res.address;
            this.student.password = res.password;
            this.isSearched = true;
          } else {
            this.alertMessage('Student Not Found', 'error');
          }
        },(error) => {
          this.alertMessage('Something went wrong', 'error');
        });
    }
  }

  public deleteStudent() {
    if (this.student.id == '') {
      this.alertMessage('Please search student first', 'error');
    } else {
      if (this.validateStudent()) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to Remove this student from institute',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            this.http.delete(`http://localhost:8080/institutes/${this.instituteId}/students/remove/${this.student.id}`).subscribe((res) => {
              this.alertMessage('Student removed successfully', 'success');
            },(error) => {
              this.alertMessage('Student not removed', 'error');
            });
          }else{
            this.alertMessage('Something went wrong', 'error');
          }
        })
      }
    }
  }
  private alertMessage(message: any, type: any) {
    Swal.fire({
      title: 'Alert',
      text: message,
      icon: type,
    });
  }
}
