import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../common/footer/footer.component';
import { StudentNavbarComponent } from '../common/student-navbar/student-navbar.component';
@Component({
  selector: 'app-student-leave-institute',
  standalone: true,
  imports: [CommonModule,FormsModule,FooterComponent,StudentNavbarComponent],
  templateUrl: './student-leave-institute.component.html',
  styleUrl: './student-leave-institute.component.css'
})
export class StudentLeaveInstituteComponent {
  public searchedInstituteId: String="";
  public searchedInstitute:any={};
  public instituteList:any[]=[];
  public isCourseSearched: boolean = false;
  private studentId: string='';
  constructor(private http: HttpClient){
    this.studentId=JSON.parse(sessionStorage.getItem('LoggedUser') || '').id;
    this.http.get(`http://localhost:8080/students/search/${this.studentId}`).subscribe((student:any)=>{
      for(let institute of student.registeredInstitutes){
        this.http.get(`http://localhost:8080/institutes/search/${institute.instituteId}`).subscribe((resInstitute:any)=>{
          this.instituteList.push(resInstitute);  
        })
      }
    },(err)=>{
      this.alert('Error in fetching courses', 'error');
    })  
  }
  public searchInstitute(){
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
        this.alert('Your are not registered in this institute', 'error');
       }
      }
    }
  }
  public leaveInstitute(){
    if(this.isCourseSearched){
      this.http.delete(`http://localhost:8080/institutes/${this.searchedInstitute.id}/students/remove/${this.studentId}`,{}).subscribe((res:any)=>{
        this.alert('You have successfully left the institute', 'success');
      },(err)=>{
        this.alert('Error in leaving institute', 'error');
      })

    }else{
      this.alert('Please search a institute', 'error');
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
