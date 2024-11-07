import { Component } from '@angular/core';
import { FooterComponent } from '../../../common/footer/footer.component';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-institute-register-teacher',
  standalone: true,
  imports: [
    FooterComponent,
    InstituteNavbarComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './institute-register-teacher.component.html',
  styleUrl: './institute-register-teacher.component.css',
})
export class InstituteRegisterTeacherComponent {
  public ConfirmPassword: string = '';
  public isRegistered: Boolean = false;
  private isSearched: Boolean = false;
  public teacherId: string = '';
  private teacherData: any;
  private instituteId: string = '';
  public teacher: any = {
    firstName: '',
    lastName: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    password: '',
  };
  constructor(private router: Router, private http: HttpClient) {
    this.http
      .get(`http://localhost:8080/teachers/all`)
      .subscribe((res: any) => {
        this.teacherData = res;
      });
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.instituteId = LoggedUser.id;
  }
  public cancel() {
    this.clearData();
  }
  private clearData() {
    this.teacher = {
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
    this.teacherId = '';
  }
  private validateTeacher(): boolean {
    const contactPattern = /^0[0-9]{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.isRegistered) {
      if (this.teacher.firstName == '') {
        this.alertMessage('First Name is Required', 'error');
        return false;
      }
      if (this.teacher.lastName == '') {
        this.alertMessage('Last Name is Required', 'error');
        return false;
      }
      if (this.teacher.contact == '') {
        this.alertMessage('Contact is Required', 'error');
        return false;
      }
      if (this.teacher.email == '') {
        this.alertMessage('Email is Required', 'error');
        return false;
      }
      if (this.teacher.address == '') {
        this.alertMessage('Address is Required', 'error');
        return false;
      }
      if (this.teacher.password == '') {
        this.alertMessage('Password is Required', 'error');
        return false;
      }
      if (this.ConfirmPassword == '') {
        this.alertMessage('Confirm Password is Required', 'error');
        return false;
      }
      if (this.teacher.password != this.ConfirmPassword) {
        this.alertMessage(
          'Password and Confirm Password does not match',
          'error'
        );
        return false;
      }
      if (!contactPattern.test(this.teacher.contact)) {
        this.alertMessage('Contact Number is Invalid', 'error');
        return false;
      }
      if (!emailPattern.test(this.teacher.email)) {
        this.alertMessage('Email Address is Invalid', 'error');
        return false;
      }
      if (!passwordPattern.test(this.teacher.password)) {
        this.alertMessage('Password is Invalid', 'error');
        return false;
      }
      return true;
    } else {
      if (this.isSearched) {
        return true;
      } else {
        this.alertMessage('Please search teacher first', 'error');
        return false;
      }
    }
  }
  public searchTeacher() {
    if (this.teacherId === '') {
      this.alertMessage('Invalid Teacher Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/teachers/search/${this.teacherId}`)
        .subscribe((res: any) => {
          if (res) {
            this.teacher.firstName = res.firstName;
            this.teacher.lastName = res.lastName;
            this.teacher.dob = res.dob;
            this.teacher.contact = res.contact;
            this.teacher.email = res.email;
            this.teacher.address = res.address;
            this.isSearched = true;
          } else {
            this.alertMessage('Teacher Not Found', 'error');
          }
        });
    }
  }
  public registerTeacher() {
    if (this.validateTeacher()) {
      this.http.post(`http://localhost:8080/teachers/register`,this.teacher).subscribe((res)=>{
        this.alertMessage('Teacher Registered successfully', 'success');
            this.clearData();
        },
        (error) => {
          this.alertMessage('Something went wrong', 'error');
        }
      );
    }
  }
  public AddTeacher() {
    if (this.validateTeacher()) {
      let regTeachers = {
        teacherId: this.teacherId,
        instituteId: this.instituteId,
        date: new Date().toISOString().split('T')[0],
      };

      this.http
        .post(`http://localhost:8080/institutes/teachers/add`, regTeachers)
        .subscribe(
          (res) => {
            this.alertMessage('Teacher added successfully', 'success');
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
