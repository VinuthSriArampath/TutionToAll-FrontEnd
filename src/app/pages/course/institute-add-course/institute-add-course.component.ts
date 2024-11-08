import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
@Component({
  selector: 'app-institute-add-course',
  standalone: true,
  imports: [
    InstituteNavbarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './institute-add-course.component.html',
  styleUrl: './institute-add-course.component.css',
})
export class InstituteAddCourseComponent {
  public Course: any = {
    name: '',
    type: '',
  };
  public teacher: any = {
    teacherId: '',
    teacherName: '',
  };
  public isSearched: boolean = false;
  constructor(private router: Router, private http: HttpClient) {
    const loggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '{}');
    this.instituteId = loggedUser.id;
  }
  private instituteId: any;
  addCourse() {
    if (this.validateDetails()) {
      if (this.isSearched) {
          this.http.post(`http://localhost:8080/courses/add/${this.instituteId}`,this.Course).subscribe((res: any) => {
            this.addTeacherToCourse(res);
          });
      } else {
        this.alertMessage('Search Teacher First', 'error');
      }
    }
  }
  private validateDetails(): boolean {
    if (this.Course.name === '') {
      this.alertMessage('Course Name is Required', 'error');
      return false;
    }
    if (this.Course.type === '') {
      this.alertMessage('Course Type is Required', 'error');
      return false;
    }
    return true;
  }
  private alertMessage(message: string, type: any) {
    swal.fire({
      title: 'Alert',
      text: message,
      icon: type,
    });
  }
  private clearData() {
    this.Course = {
      courseName: '',
      courseType: '',
    };
    this.teacher = {
      teacherId: '',
      teacherName: '',
    };
    this.isSearched = false;
  }

  public cancel() {
    this.clearData();
  }
  searchTeacher() {
    if (this.teacher.teacherId === '') {
      this.alertMessage('Invalid Teacher Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/teachers/search/${this.teacher.teacherId}`)
        .subscribe((res: any) => {
          if (res) {
            this.teacher.teacherName = res.firstName + ' ' + res.lastName;
            this.isSearched = true;
          } else {
            this.alertMessage('Teacher Not Found', 'error');
          }
        });
    }
  }
  addTeacherToCourse(courseId: any) {
    this.http.post(`http://localhost:8080/courses/${courseId}/teachers/add/${this.teacher.teacherId}`,{}).subscribe();
    this.clearData();
    this.alertMessage('Course Added Successfully', 'success');
  }
}
