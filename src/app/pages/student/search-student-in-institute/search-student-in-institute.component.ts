import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';

@Component({
  selector: 'app-search-student-in-institute',
  standalone: true,
  imports: [FormsModule,CommonModule,FooterComponent,InstituteNavbarComponent],
  templateUrl: './search-student-in-institute.component.html',
  styleUrl: './search-student-in-institute.component.css'
})
export class SearchStudentInInstituteComponent {
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
  public studentList:any[]=[];
  constructor(private router: Router, private http: HttpClient) {
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.instituteId = LoggedUser.id;
    this.http.get(`http://localhost:8080/institutes/search/${this.instituteId}`).subscribe((res: any) => {
      for(let student of res.registeredStudents){
        this.http.get(`http://localhost:8080/students/search/${student.studentId}`).subscribe((res: any) => {
          this.studentList.push({
            id: res.id,
            fName: res.firstName,
            lName: res.lastName,
            email: res.email,
            phone: res.contact,
            dob: res.dob,
            address: res.address,
            enrollmentDate: student.date
          });
        },(error) => {
          this.alertMessage('Something went wrong while fetching the student details', 'error');
        });
      }
    },(error) => {
      this.alertMessage('Something went wrong while fetching the institute details', 'error');
    });
  }
  public cancel() {
    this.student = {
      id: '',
      firstName: '',
      lastName: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
    };
  }
  public searchStudent() {
    let isSearched: Boolean = false;
    if (this.searchedStudentId === '') {
      this.alertMessage('Invalid Student Id', 'error');
    } else {
      for (let student of this.studentList) {
        if (student.id === this.searchedStudentId) {
          this.student.id = student.id;
          this.student.firstName = student.fName;
          this.student.lastName = student.lName;
          this.student.email = student.email;
          this.student.contact = student.phone;
          this.student.dob = student.dob;
          this.student.address = student.address;
          isSearched = true;
          break;
        }
      };
      if (!isSearched) {
        this.alertMessage('Student Not Found in this Institute', 'error');
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
