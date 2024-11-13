import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { StudentNavbarComponent } from '../common/student-navbar/student-navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-institute-in-student',
  standalone: true,
  imports: [CommonModule,FormsModule,FooterComponent,StudentNavbarComponent],
  templateUrl: './search-institute-in-student.component.html',
  styleUrl: './search-institute-in-student.component.css'
})
export class SearchInstituteInStudentComponent {
  public searchedCourseId: String="";
  public institute:any={
    id:'',
    name:''
  }
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
