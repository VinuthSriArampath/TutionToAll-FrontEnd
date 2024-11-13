import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../common/footer/footer.component';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
@Component({
  selector: 'app-search-teacher',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent,InstituteNavbarComponent],
  templateUrl: './search-teacher.component.html',
  styleUrl: './search-teacher.component.css'
})
export class SearchTeacherComponent {
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
    password: '',
  };
  public teacherList:any[]=[];
  constructor(private router: Router, private http: HttpClient) {
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.instituteId = LoggedUser.id;
    this.http.get(`http://localhost:8080/institutes/search/${this.instituteId}`).subscribe((res: any) => {
      for(let teacher of res.registeredTeachers){
        this.http.get(`http://localhost:8080/teachers/search/${teacher.teacherId}`).subscribe((res: any) => {
          this.teacherList.push({
            id: res.id,
            fName: res.firstName,
            lName: res.lastName,
            email: res.email,
            phone: res.contact,
            dob: res.dob,
            address: res.address,
            enrollmentDate: teacher.date
          });
        },(error) => {
          this.alertMessage('Something went wrong while fetching the teacher details', 'error');
        });
      }
    },(error) => {
      this.alertMessage('Something went wrong while fetching the institute details', 'error');
    });
  }
  public cancel() {
    this.teacher = {
      id: '',
      firstName: '',
      lastName: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
    };
  }
  public searchTeacher() {
    let isSearched: Boolean = false;
    if (this.searchedTeacherId === '') {
      this.alertMessage('Invalid Teacher Id', 'error');
    } else {
      for (let teacher of this.teacherList) {
        if (teacher.id === this.searchedTeacherId) {
          this.teacher.id = teacher.id;
          this.teacher.firstName = teacher.fName;
          this.teacher.lastName = teacher.lName;
          this.teacher.email = teacher.email;
          this.teacher.contact = teacher.phone;
          this.teacher.dob = teacher.dob;
          this.teacher.address = teacher.address;
          isSearched = true;
          break;
        }
      };
      if (!isSearched) {
        this.alertMessage('Teacher Not Found in this Institute', 'error');
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
