import { Component } from '@angular/core';
import { StudentNavbarComponent } from '../common/student-navbar/student-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    StudentNavbarComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  public instituteList: any = [
    {
      studentId: '',
      instituteId: '',
      instituteName: '',
      date: '',
      courses: [
        {
          studentId: '',
          courseName: '',
          courseId: '',
          date: '',
        },
      ],
    },
  ];
  public courseList: any = [];
  constructor(private http: HttpClient) {
    this.http.get(`http://localhost:8080/courses/getAll`).subscribe((res: any) => {
      this.courseList = res;
      const studentId = JSON.parse(sessionStorage.getItem('LoggedUser') || '').id;
    this.http
      .get(`http://localhost:8080/students/search/${studentId}`)
      .subscribe((res: any) => {
        this.instituteList = res.registeredInstitutes;
        for (let institute of this.instituteList) {
          for (let course of institute.courses) {
            for (let c of this.courseList) {
              if (course.courseId == c.id) { 
                course.courseName = c.name;
              }
            }
          }
        }
      });
    });
  }
}
