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
  public searchedInstituteId: String="";
  public searchedInstitute:any={};
  public instituteList:any[]=[];
  public isCourseSearched: boolean = false;
  

  constructor(private http: HttpClient){
    this.http.get(`http://localhost:8080/students/search/${JSON.parse(sessionStorage.getItem('LoggedUser') || '').id}`).subscribe((student:any)=>{
      for(let institute of student.registeredInstitutes){
        this.http.get(`http://localhost:8080/institutes/search/${institute.instituteId}`).subscribe((resInstitute:any)=>{
          this.instituteList.push(resInstitute);  
        })
      }
    },(err)=>{
      this.alert('Error in fetching courses', 'error');
    })  
  }
  public searchCourse(){
    if (this.searchedInstituteId == '') {
      this.alert('Please enter a institute id', 'error');
    }else{
      for(let institute of this.instituteList){
       if(institute.id==this.searchedInstituteId){
        this.searchedInstitute=institute;
        this.isCourseSearched=true;
        break;
       }else{
        this.isCourseSearched=false;
        this.alert('Institute not found', 'error');
       }
      }
      console.log(this.searchedInstitute);
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
