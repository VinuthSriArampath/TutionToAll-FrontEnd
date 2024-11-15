import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TeacherNavbarComponent } from '../../teacher/common/teacher-navbar/teacher-navbar.component';
@Component({
  selector: 'app-teacher-course',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule, TeacherNavbarComponent],
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css'],
})
export class TeacherCourseComponent {
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.http
      .get(`http://localhost:8080/courses/getByCourseId/${this.courseId}`)
      .subscribe((res: any) => {
        this.course = res;
        this.loadAssignmentsTable();
        this,this.loadNoteTable();
      });
  }
  private validateAssignment():boolean {
    if (this.assignmentName == '') {
      this.alertMessage('Please enter a Assignment Name', 'error');
      return false;
    }
    if (this.dueDate == '' || Date.parse(this.dueDate) < Date.now()) {
      this.alertMessage('Please Select a Valid date', 'error');
      return false;
    }
    if (!this.assignmentDoc) {
      this.alertMessage('Document is Not Selected', 'error');
      return false;
    }
    return true;
  }

  public addAssignment() {
    if (this.validateAssignment()) {
      const formData = new FormData();
      const assignment = {
        courseId: this.courseId,
        assignmentName: this.assignmentName,
        dueDate: this.dueDate,
      };
      formData.append(
        'assignment',
        new Blob([JSON.stringify(assignment)], { type: 'application/json' })
      );

      if (this.assignmentDoc) {
        formData.append('document', this.assignmentDoc);
      }
      this.http
        .post('http://localhost:8080/assignment/add', formData)
        .subscribe({
          next: (res: any) => {
            this.alertMessage('Assignment Added Successfully !', 'success');
            this.loadAssignmentsTable();
            this.assignmentName = '';
            this.dueDate = '';
            this.assignmentDoc = null;
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
          },
          error: (error) => {
            this.alertMessage('Error adding assignment ', "error");
          },
        });
    }
  }

  private validateNote():boolean{
    if (this.noteName == '') {
      this.alertMessage('Please enter a Note Name', 'error');
      return false;
    }
    if (!this.noteDoc) {
      this.alertMessage('Document is Not Selected', 'error');
      return false;
    }
    return true;
  }
  public addNote(){
    if (this.validateNote()) {
      const formData = new FormData();
      const note = {
        courseId: this.courseId,
        title: this.noteName,
      };
      formData.append(
        'note',
        new Blob([JSON.stringify(note)], { type: 'application/json' })
      );

      if (this.noteDoc) {
        formData.append('document', this.noteDoc);
      }
      this.http
        .post('http://localhost:8080/notes/add', formData)
        .subscribe({
          next: (res: any) => {
            this.alertMessage('Note Added Successfully !', 'success');
            this.loadNoteTable();
            this.noteName = '';
            this.noteDoc = null;
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
          },
          error: (error) => {
            this.alertMessage('Error adding Note ', "error");
          },
        });
    }
    
  }

  onFileSelected(event: any) {
    this.assignmentDoc = event.target.files[0] as File;
  }

  onNoteSelect(event:any){
    this.noteDoc=event.target.files[0] as File;
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
        console.log(res);
         
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
