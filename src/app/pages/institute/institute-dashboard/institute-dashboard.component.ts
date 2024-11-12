import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../common/institute-navbar/institute-navbar.component';
import { FooterComponent } from "../../../common/footer/footer.component";
import { AppComponent } from "../../../app.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-institute-dashboard',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent, AppComponent,FormsModule,CommonModule],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent {
  public noOfStudents:number=0;
  public noOfTeachers:number=0;
  public noOfCourses:number=0;
  public courseList:any[]=[];

  constructor(private http:HttpClient){
    const instituteId=JSON.parse(sessionStorage.getItem('LoggedUser') || '').id;
    this.http.get<any>(`http://localhost:8080/institutes/search/${instituteId}`).subscribe((res)=>{
      this.courseList=res.courseList;
      
      this.noOfStudents=res.registeredStudents.length;
      this.noOfTeachers=res.registeredTeachers.length;
      this.noOfCourses=res.courseList.length;
    })
    
  }
}
