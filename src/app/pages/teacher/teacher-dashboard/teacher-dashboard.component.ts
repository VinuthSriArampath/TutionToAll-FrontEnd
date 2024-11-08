import { Component } from '@angular/core';
import { TeacherNavbarComponent } from "../common/teacher-navbar/teacher-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [TeacherNavbarComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {
public instituteList:any[]=[];
public instituteCourseList:any[]=[];
constructor(private http:HttpClient){
  const teacherId = JSON.parse(sessionStorage.getItem('LoggedUser') || '').id;

  this.http.get(`http://localhost:8080/teachers/search/${teacherId}`).subscribe((teacher:any)=>{
    for(let institute of teacher.registeredInstitutes){
      this.http.get(`http://localhost:8080/institutes/search/${institute.instituteId}`).subscribe((institute:any)=>{
        this.instituteList.push(institute);
        let tempCourseArray:any[]=[];
        for(let course of institute.courseList){
          if(teacher.registeredCourses.find((c:any)=>c.id===course.id)){   
            tempCourseArray.push(course);
          }
        }
        this.instituteCourseList.push(tempCourseArray);
      })
    }   
  })
}
}
