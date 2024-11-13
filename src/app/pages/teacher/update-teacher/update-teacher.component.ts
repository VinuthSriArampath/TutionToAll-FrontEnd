import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../../common/footer/footer.component';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule,FooterComponent,InstituteNavbarComponent],
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.css'
})
export class UpdateTeacherComponent {
  public isSearched: Boolean = false;
  private teacherData: any;
  private instituteId: string = '';
  public searchedTeacherId: string = '';
  public teacher: any = {
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
    this.http
      .get(`http://localhost:8080/teachers/all`)
      .subscribe((res: any) => {
        this.teacherData = res;
      });
    
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.instituteId = LoggedUser.id;
  }
  public cancel() {
    this.teacher = {
      firstName: '',
      lastName: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
      password: '',
    };
    this.isSearched = false;
  }
  private validateTeacher(): boolean {
    const contactPattern = /^0[0-9]{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.isSearched) {
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
    if (this.searchedTeacherId === '') {
      this.alertMessage('Invalid Teacher Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/teachers/search/${this.searchedTeacherId}`)
        .subscribe((res: any) => {
          console.log(res);
          
          if (res) {
            this.teacher.id = res.id;
            this.teacher.firstName = res.firstName;
            this.teacher.lastName = res.lastName;
            this.teacher.dob = res.dob;
            this.teacher.contact = res.contact;
            this.teacher.email = res.email;
            this.teacher.address = res.address;
            this.teacher.password = res.password;
            this.isSearched = true;
          } else {
            this.alertMessage('Teacher Not Found', 'error');
          }
        },(error) => {
          this.alertMessage('Something went wrong', 'error');
        });
    }
  }

  public updateTeacher() {
    if (this.teacher.id == '') {
      this.alertMessage('Please search teacher first', 'error');
    } else {
      if (this.validateTeacher()) {
        this.http.patch('http://localhost:8080/teachers/update',this.teacher).subscribe((res) => {
          this.alertMessage('Teacher updated successfully', 'success');
        },(error) => {
          this.alertMessage('Something went wrong', 'error');
        });
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
