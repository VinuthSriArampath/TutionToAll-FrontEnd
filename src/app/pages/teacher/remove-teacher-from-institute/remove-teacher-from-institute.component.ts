import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../common/footer/footer.component';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';

@Component({
  selector: 'app-remove-teacher-from-institute',
  standalone: true,
  imports: [FormsModule,FooterComponent,FooterComponent,InstituteNavbarComponent],
  templateUrl: './remove-teacher-from-institute.component.html',
  styleUrl: './remove-teacher-from-institute.component.css'
})
export class RemoveTeacherFromInstituteComponent {
  public isSearched: Boolean = false;
  public instituteId: string = '';
  public searchedTeacherId: string = '';
  public teacher: any = {
    id:'',
    firstName: '',
    lastName: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
  };
  constructor(private router: Router, private http: HttpClient) {
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
      if (!contactPattern.test(this.teacher.contact)) {
        this.alertMessage('Contact Number is Invalid', 'error');
        return false;
      }
      if (!emailPattern.test(this.teacher.email)) {
        this.alertMessage('Email Address is Invalid', 'error');
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
  public searchTeacher() {
    if (this.searchedTeacherId === '') {
      this.alertMessage('Invalid Teacher Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/teachers/search/${this.searchedTeacherId}`)
        .subscribe((res: any) => {
          if (res) {
            this.teacher.id = res.id;
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
        },(error) => {
          this.alertMessage('Something went wrong', 'error');
        });
    }
  }

  public deleteTeacher() {
    if (this.teacher.id == '') {
        this.alertMessage('Please search teacher first', 'error');
    } else {
      if (this.validateTeacher()) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to Remove this teacher from institute',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            this.http.delete(`http://localhost:8080/institutes/${this.instituteId}/teacher/remove/${this.teacher.id}`).subscribe((res) => {
                this.alertMessage('Teacher removed successfully', 'success');
            },(error) => {
              this.alertMessage('Teacher not removed', 'error');
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
