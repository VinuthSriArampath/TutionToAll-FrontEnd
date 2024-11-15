import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentNavbarComponent } from '../../student/common/student-navbar/student-navbar.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-teacher-course',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule, StudentNavbarComponent],
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css'],
})
export class TeacherCourseComponent {
  public courseId: string = '';
  public course: any = { id: '', name: '', type: '', teacherId: '' };
  public assignmentName: string = '';
  public dueDate: string = '';
  public assignmentDoc: File | null = null;
  public assignmentList: any[] = [];
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
            this.assignmentName = '';
            this.dueDate = '';
            this.assignmentDoc = null;
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
          },
          error: (error) => {
            console.error('Error adding assignment:', error);
          },
        });
    }
  }

  onFileSelected(event: any) {
    this.assignmentDoc = event.target.files[0] as File;
  }

  loadAssignmentsTable(){
    
  }

  private alertMessage(title: String, icon: any) {
    Swal.fire({
      title: title,
      icon: icon,
    });
  }
}
