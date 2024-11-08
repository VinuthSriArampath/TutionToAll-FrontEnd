import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-manage-course',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './manage-course.component.html',
  styleUrl: './manage-course.component.css',
})
export class ManageCourseComponent {

  searchCourseId: String = '';
  searchStudentId: String = '';

  public course:any = {};
  public courseStudentList:any = [];
  private instituteId: String = '';
  public searchedStudent:any = {};

  isStudentSearched: boolean = false;
  isCourseSearched: boolean = false;
  constructor(private http: HttpClient) {
    this.instituteId = JSON.parse(sessionStorage.getItem('LoggedUser') || '').id;
  }
  searchCourse() {
    if(this.searchCourseId == ''){
      this.alertMessage('Please enter course id', 'error');
      return;
    }else{
      this.courseStudentList = [];
      this.course = {};
      this.http.get(`http://localhost:8080/courses/search/${this.searchCourseId}/institute/${this.instituteId}`).subscribe((res:any)=>{
        if(res){
          this.course = res;
          for(let student of this.course.studentCoursesList){
            this.http.get(`http://localhost:8080/students/search/${student.studentId}`).subscribe((res:any)=>{
              this.courseStudentList.push(res);
              this.isCourseSearched = true;
            })
          }
        }else{
          swal.fire({
            title:`Course Not Found in institute ${this.instituteId}`,
            icon:'error'
          })
        }
      })
    }
  }
  searchStudent(){
    if(this.searchStudentId == ''){
      this.alertMessage('Please enter student id', 'error');
      return;
    }else{
      this.http.get(`http://localhost:8080/students/search/${this.searchStudentId}`).subscribe((res:any)=>{
        this.searchedStudent = res;
        this.isStudentSearched = true;
      },(error:any)=>{
        this.alertMessage('Student not found', 'error');
      })
    }
    
  }
  addStudentToCourse(){
    if(this.isCourseSearched && this.isStudentSearched){
      let studentCourse = {
        studentId: this.searchedStudent.id,
        courseId: this.course.id,
        date: new Date().toISOString().split('T')[0]
      }
      this.http.post(`http://localhost:8080/courses/students/add`,studentCourse).subscribe((res:any)=>{
          this.alertMessage('Student added successfully', 'success');
          this.cancel();
      })
    }else{
      this.alertMessage('Please search course and student', 'error');
    }
  }
  private alertMessage(message: any, type: any) {
    swal.fire({
      title: message,
      icon: type,
    });
  }
  cancel(){
    this.isStudentSearched = false;
    this.searchedStudent = {};
    this.searchStudentId = '';
  }
}
