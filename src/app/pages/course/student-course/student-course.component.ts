import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNavbarComponent } from "../../student/common/student-navbar/student-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [StudentNavbarComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent{
  public courseId: string = '';
  today: Date = new Date();
  public course: any = { id: '', name: '', type: '', teacherId: '' };
  public assignmentName: string = '';
  public dueDate: string = '';
  public assignmentDoc: File | null = null;
  public assignmentList: any[] = [];
  
  public noteName:String='';
  public noteDoc: File | null =null;
  public noteList: any[] = [];
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.http
      .get(`http://localhost:8080/courses/getByCourseId/${this.courseId}`)
      .subscribe((res: any) => {
        this.course = res;
        this.loadAssignmentsTable();
        this,this.loadNoteTable();
      });
  }
  loadAssignmentsTable(){
    this.http.get(`http://localhost:8080/assignment/all/byCourseId/${this.courseId}`).subscribe({
      next:(res:any)=>{
        this.assignmentList=res
      },
      error:(error)=>{

      }
    })
  }
  loadNoteTable(){
    this.http.get(`http://localhost:8080/notes/all/byCourseId/${this.courseId}`).subscribe({
      next:(res:any)=>{   
        this.noteList=res
      },
      error:(error)=>{

      }
    })
  }

  private alertMessage(title: String, icon: any) {
    Swal.fire({
      title: title,
      icon: icon,
    });
  }
  checkDueDate(dueDate: string):number{
    const today = new Date();
    const assignmentDueDate = new Date(dueDate);
    if(this.isDueDateToday(assignmentDueDate)){
      return 0;
    }else if(assignmentDueDate > today){
      return 1;
    }else{
      return -1;
    }
  }
  isDueDateFuture(dueDate: string): boolean {
    const today = new Date();
    const assignmentDueDate = new Date(dueDate);
    if( assignmentDueDate > today){
      return true;
    }else{
      return false;
    }
    
  }
  isDueDateToday(dueDate: string | Date): boolean {
    const today = new Date();
    const due = new Date(dueDate);

    return (
        today.getFullYear() === due.getFullYear() &&
        today.getMonth() === due.getMonth() &&
        today.getDate() === due.getDate()
    );
}

}
