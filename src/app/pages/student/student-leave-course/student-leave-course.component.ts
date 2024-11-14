import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../common/footer/footer.component';
import { StudentNavbarComponent } from '../common/student-navbar/student-navbar.component';


class Course {
  courseId: string='';
  instituteId: string='';
  instituteName: string='';
  courseName: string='';
  courseType: string='';
  teacherId: string='';
  teacherName: string='';
  enrollmentDate: string='';
  constructor(courseId:string,instituteId:string,instituteName:string,courseName:string,courseType:string,teacherId:string,teacherName:string,enrollmentDate:string){
    this.courseId=courseId;
    this.instituteId=instituteId;
    this.instituteName=instituteName;
    this.courseName=courseName;
    this.courseType=courseType;
    this.teacherId=teacherId;
    this.teacherName=teacherName;
    this.enrollmentDate=enrollmentDate;
  }
}
@Component({
  selector: 'app-student-leave-course',
  standalone: true,
  imports: [CommonModule,FormsModule,FooterComponent,StudentNavbarComponent],
  templateUrl: './student-leave-course.component.html',
  styleUrl: './student-leave-course.component.css'
})
export class StudentLeaveCourseComponent {
  public searchedCourseId: String="";
  public searchedCourse:Course={
    courseId:'',
    instituteId:'',
    instituteName:'',
    courseName:'',
    courseType:'',
    teacherId:'',
    teacherName:'',
    enrollmentDate:''
  };
  public courseList:Course[]=[];

  public isCourseSearched: boolean = false;

  constructor(private http: HttpClient){
    this.http.get(`http://localhost:8080/students/search/${JSON.parse(sessionStorage.getItem('LoggedUser') || '').id}`).subscribe((student:any)=>{
      for(let institute of student.registeredInstitutes){
        for(let course of institute.courses){
          this.http.get(`http://localhost:8080/courses/getByCourseId/${course.courseId}`).subscribe((resCourse:any)=>{
            this.courseList.push(new Course(resCourse.id,institute.instituteId,institute.instituteName,resCourse.name,resCourse.type,resCourse.teacherId,resCourse.teacherName,course.date));
          })
        }
      }
    },(err)=>{
      this.alert('Error in fetching courses', 'error');
    })
  }
  public searchCourse(){
    let found:Boolean=false;
    if (this.searchedCourseId == '') {
      this.alert('Please enter a course id', 'error');
    }else{
      for(let course of this.courseList){
        if(course.courseId==this.searchedCourseId){
          this.searchedCourse=course;
          this.isCourseSearched=true;
          found=true;
          break;
        }
      }
      if(!found){
        this.alert('Course not found', 'error');
      }
    }
  }
  public unRegisterCourse(){
   
  }
  private alert(title: string, type: any){
    Swal.fire({
      title: title,
      icon: type,
      confirmButtonText: 'OK',
    });
  }
}
