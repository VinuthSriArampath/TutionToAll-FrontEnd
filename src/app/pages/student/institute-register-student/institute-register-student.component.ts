import { Component } from '@angular/core';
import { InstituteNavbarComponent } from "../../institute/common/institute-navbar/institute-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-institute-register-student',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './institute-register-student.component.html',
  styleUrl: './institute-register-student.component.css'
})
export class InstituteRegisterStudentComponent {
  public ConfirmPassword: string = '';
  public isRegistered: Boolean = false;
  private isSearched: Boolean = false;
  public studentId: string = '';
  private instituteId: string = '';
  public student: any = {
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
    this.clearData();
  }
  private clearData() {
    this.student = {
      firstName: '',
      lastName: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
      password: '',
    };
    this.isRegistered = false;
    this.ConfirmPassword = '';
    this.studentId = '';
  }
  private validateStudent(): boolean {
    const contactPattern = /^0[0-9]{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.isRegistered) {
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
    if (this.studentId === '') {
      this.alertMessage('Invalid Student Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/students/search/${this.studentId}`)
        .subscribe((res: any) => {
          if (res) {
            this.student.firstName = res.firstName;
            this.student.lastName = res.lastName;
            this.student.dob = res.dob;
            this.student.contact = res.contact;
            this.student.email = res.email;
            this.student.address = res.address;
            this.isSearched = true;
          } else {
            this.alertMessage('Student Not Found', 'error');
          }
        });
    }
  }
  public registerStudent() {
    if (this.validateStudent()) {
      this.http.post(`http://localhost:8080/students/register`, this.student).subscribe(
        (res) => {
          this.alertMessage('Student Registered successfully', 'success');
          this.clearData();
        },
        (error) => {
          this.alertMessage('Something went wrong', 'error');
        });
    }
  }
  public AddTeacher() {
    if (this.validateStudent()) {
      let regStudent = {
        studentId: this.studentId,
        instituteId: this.instituteId,
        date: new Date().toISOString().split('T')[0],
      };

      this.http
        .post(`http://localhost:8080/institutes/students/add`, regStudent)
        .subscribe(
          (res) => {
            this.alertMessage('Student added successfully', 'success');
            this.clearData();
          },
          (error) => {
            this.alertMessage('Something went wrong', 'error');
          }
        );
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
