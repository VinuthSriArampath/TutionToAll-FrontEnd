import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, RouterLink, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Hearder1Component } from "../headers/hearder-1/hearder-1.component";
import { HttpClient } from '@angular/common/http';
import { emit } from 'process';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, Hearder1Component],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  public username:String = "";
  public password:String = "";
  institutes: any[] = [];
  students: any[] = [];
  teachers: any[] = [];
  private LoggedUser:any={
    id:"",
    email:""
  }
  constructor(private http: HttpClient,private router: Router) {
    this.http.get('http://localhost:8080/institutes/all').subscribe(res => this.institutes = res as any[]);
    this.http.get('http://localhost:8080/students/all').subscribe(res => this.students = res as any[]);
    this.http.get('http://localhost:8080/teachers/all').subscribe(res => this.teachers = res as any[]);
  }
  login(){
    if(this.validateLogin()){

      if (this.username.charAt(0) === "I") {  // Institute Login


        const institute = this.institutes.find((ins:any)=>ins.id === this.username);
        if(institute.password === this.password){
          swal.fire({
            title: "Login Successful!",
            text: `Welcome ${institute.name}`,
            icon: "success",
            confirmButtonText: "Continue"
          }).then((result) => {
            if (result.isConfirmed) {
              this.LoggedUser.id = institute.id;
              this.LoggedUser.email = institute.email;
              sessionStorage.setItem("LoggedUser",JSON.stringify(this.LoggedUser));
              this.router.navigate(['/institute/register']);
            }
          });
        }else{
          this.alertMessage("Invalid Password","Please enter the correct password","error");
        }


      }else if (this.username.charAt(0) === "S") {  // Student Login


        const student = this.students.find((st:any)=>st.id === this.username);
        if(student.password === this.password){
          swal.fire({
            title: "Login Successful!",
              text: `Welcome ${student.name}`,
            icon: "success",
            confirmButtonText: "Continue"
          }).then((result) => {
            if (result.isConfirmed) {
              this.LoggedUser.id = student.id;
                this.LoggedUser.email = student.email;
              sessionStorage.setItem("LoggedUser",JSON.stringify(this.LoggedUser));
              this.router.navigate(['/student/register']);
            }
          });
        }else{
          this.alertMessage("Invalid Password","Please enter the correct password","error");
        }


      }else if (this.username.charAt(0) === "T") {  // Teacher Login


        const teacher = this.teachers.find((t:any)=>t.id === this.username);
        if(teacher.password === this.password){
          swal.fire({
            title: "Login Successful!",
            text: `Welcome ${teacher.name}`,
            icon: "success",
            confirmButtonText: "Continue"
          }).then((result) => {
            if (result.isConfirmed) {
              this.LoggedUser.id = teacher.id;
              this.LoggedUser.email = teacher.email;
              sessionStorage.setItem("LoggedUser",JSON.stringify(this.LoggedUser));
              this.router.navigate(['/teacher/register']);
            }
          });
        }else{
          this.alertMessage("Invalid Password","Please enter the correct password","error");
        }


      }
    }
  }
  validateLogin():boolean{
    if(!this.username){
      this.alertMessage("Username is Required","Please enter your username","error");
      return false;
    }else if(!this.password){
      this.alertMessage("Password is Required","Please enter your password","error");
      return false;
    }
    return true;
  }
  alertMessage(title: string, message: string, type: any) {
    swal.fire({
      title: title,
      text: message,
      icon: type,
    });
  }
}
