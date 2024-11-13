import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [
    InstituteNavbarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css',
})
export class DeleteCourseComponent {
  public searchedCourseId: String="";
  public course : any ={
    id:'',
    name:'',
    type:'',
    teacherId:'',
    teacherName:''
  }

  public isCourseSearched: boolean = false;
  private instituteId: string;
  public students:any[]=[];
  constructor(private http: HttpClient){
    this.instituteId=JSON.parse(sessionStorage.getItem('LoggedUser') || '').id;  
  }
  public searchCourse(){
    if (this.searchedCourseId == '') {
      this.alert('Please enter a course id', 'error');
    }else{
      this.http.get(`http://localhost:8080/courses/search/${this.searchedCourseId}/institute/${this.instituteId}`).subscribe((resCourse:any)=>{
        if(resCourse){
          console.log(resCourse);
          for(let student of resCourse.studentCoursesList){
            this.http.get(`http://localhost:8080/students/search/${student.studentId}`).subscribe((res:any)=>{
              this.students.push({
                id:res.id,
                fName:res.firstName,
                lName:res.lastName,
                email:res.email,
                phone:res.contact,
                enrollmentDate:student.date
              });
            })
          }
          console.log(this.students);
          
          this.course=resCourse;
          this.isCourseSearched=true;
        }else{
          this.alert('Course not found on this '+this.instituteId, 'error');
        }
        
      })
    }
  }

  public deleteCourse(){
    if (this.course.id == '') {
      this.alert('Please search a course first', 'error');
    }else{
      Swal
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
            this.http.delete(`http://localhost:8080/courses/delete/${this.course.id}/from/${this.instituteId}`).subscribe((res:any)=>{
              this.alert('Course deleted successfully', 'success');
            })
          } else if (result.isDenied) {
            Swal.fire('Course is not deleted', '', 'info');
          }
        });
    }
  }
  private alert(title: string, type: any){
    Swal.fire({
      title: title,
      icon: type,
      confirmButtonText: 'OK',
    });
  }


}
