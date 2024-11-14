import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNavbarComponent } from "../../student/common/student-navbar/student-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [StudentNavbarComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent{
  public courseId:String='';
  public course:any={
    id:'',
    name:'',
    type:'',
    teacherId:'',
    teacherName:''
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
