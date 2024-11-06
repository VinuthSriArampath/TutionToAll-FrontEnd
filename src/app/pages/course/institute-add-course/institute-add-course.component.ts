import { Component } from '@angular/core';
import { InstituteNavbarComponent } from "../../institute/common/institute-navbar/institute-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
@Component({
  selector: 'app-institute-add-course',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent, FormsModule,CommonModule],
  templateUrl: './institute-add-course.component.html',
  styleUrl: './institute-add-course.component.css'
})
export class InstituteAddCourseComponent {
  public Course:any={
    name:"",
    type:""
  }
  constructor(private router:Router,private http:HttpClient){
    const loggedUser = JSON.parse(sessionStorage.getItem("LoggedUser")||"{}");
    this.instituteId = loggedUser.id;
  }
  private instituteId:any;
  addCourse(){
    
    if(this.validateDetails()){
      this.http.post(`http://localhost:8080/courses/add/${this.instituteId}`,this.Course).subscribe();
      this.alertMessage("Course Added Successfully","success");
      this.clearData();
    }
  }
  private validateDetails():boolean{
    if(this.Course.courseName==""){
      this.alertMessage("Course Name is Required","error");
      return false;
    }
    if(this.Course.courseType==""){
      this.alertMessage("Course Type is Required","error");
      return false;
    }
    return true;  
  }
  private alertMessage(message:string,type:any){
    swal.fire({
      title:"Alert",
      text: message,
      icon: type
    })
  }
  private clearData(){
    this.Course={
      courseName:"",
      courseType:""
    }
  }

  public cancel(){
    this.clearData();
  }
}
