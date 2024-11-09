import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { error, log } from 'node:console';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [
    InstituteNavbarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css',
})
export class UpdateCourseComponent {
  public course: any = {
    id: '',
    name: '',
    type: '',
  };

  public teacher: any = {
    teacherId: '',
    teacherName: '',
  };

  private instituteId: String;
  public searchedTeacherId: String = '';
  public searchedCourseId: String = '';

  public isSearchedTeacher: boolean = false;
  public editTeacher: boolean = false;
  public isCourseSearched: boolean = false;

  constructor(private http: HttpClient) {
    const loggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '{}');
    this.instituteId = loggedUser.id;
  }

  updateCourse() {
    if (this.validateDetails()) {
      swal
        .fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.http.patch(`http://localhost:8080/courses/update/${this.instituteId}`,this.course).subscribe((res: any) => {
              this.updateTeacherToCourse();
            });
          } else if (result.isDenied) {
            swal.fire('Changes are not saved', '', 'info');
          }
        });

      
    }
  }

  private validateDetails(): boolean {
    if (this.course.name === '') {
      this.alertMessage('Course Name is Required', 'error');
      return false;
    }
    if (this.course.type === '') {
      this.alertMessage('Course Type is Required', 'error');
      return false;
    }
    return true;
  }

  searchCourse() {
    if (this.searchedCourseId === '') {
      this.alertMessage('Invalid Course Id', 'error');
    } else {
      this.http
        .get(
          `http://localhost:8080/courses/search/${this.searchedCourseId}/institute/${this.instituteId}`
        )
        .subscribe(
          (res: any) => {
            this.course.id = res.id;
            this.course.name = res.name;
            this.course.type = res.type;
            this.teacher.teacherId = res.teacherId;
            this.teacher.teacherName = res.teacherName;
            this.isCourseSearched = true;
          },
          (error: any) => {
            this.alertMessage('Course Not Found', 'error');
          }
        );
    }
  }

  searchTeacher() {
    if (this.searchedTeacherId === '') {
      this.alertMessage('Invalid Teacher Id', 'error');
    } else {
      this.http
        .get(`http://localhost:8080/teachers/search/${this.searchedTeacherId}`)
        .subscribe((res: any) => {
          if (res) {
            this.teacher.teacherId = res.id;
            this.teacher.teacherName = res.firstName + ' ' + res.lastName;
            this.isSearchedTeacher = true;
          } else {
            this.alertMessage('Teacher Not Found', 'error');
          }
        });
    }
  }

  updateTeacherToCourse() {
    this.http.patch(`http://localhost:8080/courses/${this.course.id}/teachers/update/${this.teacher.teacherId}`,{}).subscribe();
    this.clearData();
    this.alertMessage('Course Added Successfully', 'success');
  }

  public cancel() {
    this.clearData();
  }

  private alertMessage(message: string, type: any) {
    swal.fire({
      title: 'Alert',
      text: message,
      icon: type,
    });
  }
  private clearData() {
    this.course = {
      id: '',
      name: '',
      type: '',
    };
    this.teacher = {
      teacherId: '',
      teacherName: '',
    };
    this.isSearchedTeacher = false;
    this.isCourseSearched = false;
    this.editTeacher = false;
    this.searchedTeacherId = '';
    this.searchedCourseId = '';
  }
}
