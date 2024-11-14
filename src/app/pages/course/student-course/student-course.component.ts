import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent{
  public courseId:String='';
  constructor(private activatedRoute:ActivatedRoute){
    this.courseId=this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

}
