import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentNavbarComponent } from '../../student/common/student-navbar/student-navbar.component';

@Component({
  selector: 'app-teacher-course',
  standalone: true,
  imports: [FooterComponent,CommonModule,FormsModule,StudentNavbarComponent],
  templateUrl: './teacher-course.component.html',
  styleUrl: './teacher-course.component.css'
})
export class TeacherCourseComponent {
  public courseId:String='';
  public course:any={
    id:'',
    name:'',
    type:'',
    teacherId:''
  };
  public assignmentList:any[]=[];
  public noteList:any[]=[];
  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient){
    this.courseId=this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.http.get(`http://localhost:8080/courses/getByCourseId/${this.courseId}`).subscribe((res:any)=>{
      console.log(res);
      this.course=res;
    })
  }
}
