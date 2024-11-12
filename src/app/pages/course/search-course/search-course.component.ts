import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../../common/footer/footer.component";
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-course',
  standalone: true,
  imports: [
    FooterComponent,
    InstituteNavbarComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './search-course.component.html',
  styleUrl: './search-course.component.css'
})
export class SearchCourseComponent {
  public searchedCourseId: String="";
  public course : any ={
    id:'',
    name:'',
    type:'',
    teacherId:'',
    teacherName:''
  }
  public students:any[]=[];

  public isCourseSearched: boolean = false;
  private instituteId: string;

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
  private alert(title: string, type: any){
    Swal.fire({
      title: title,
      icon: type,
      confirmButtonText: 'OK',
    });
  }
}
