import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Hearder1Component } from '../headers/hearder-1/hearder-1.component';
import { HttpClient } from '@angular/common/http';
import { emit } from 'process';
import { error } from 'console';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, Hearder1Component],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',
})
export class LoginformComponent {
  public LoginUser:any = {
    userName:'',
    password:''
  }
  private LoggedUser: any = {
    id: '',
  };
  constructor(private http: HttpClient, private router: Router) {
    this.testConnection();
  }

  testConnection():void{
  this.http.get('http://localhost:8080/connections/test').subscribe({
    next:(res)=>{
      console.log(res);
    },
    error:(err)=>{
      this.alertMessage("Connection Test","Something Went Wrong Please Try Again Reloading",'error')
    }
  });
  }
  login() {
    if (this.validateLogin()) {
      if (this.LoginUser.userName.charAt(0) === 'I') {
        this.http.post(`http://localhost:8080/auth/institute/login`, this.LoginUser).subscribe((res:any)=>{
          this.LoggedUser.id=this.LoginUser.userName;
          sessionStorage.setItem("LoggedUser",JSON.stringify(this.LoggedUser));
          this.router.navigate(['/institute/dashboard']);
        });
      } else if (this.LoginUser.userName.charAt(0) === 'S') {
        this.http.post(`http://localhost:8080/auth/student/login`, this.LoginUser).subscribe((res:any)=>{
          this.LoggedUser.id=this.LoginUser.userName;
          sessionStorage.setItem("LoggedUser",JSON.stringify(this.LoggedUser));
          this.router.navigate(['/student/dashboard']);
        });
      }else if(this.LoginUser.userName.charAt(0) === 'T'){
        this.http.post(`http://localhost:8080/auth/teacher/login`, this.LoginUser).subscribe((res:any)=>{
          this.LoggedUser.id=this.LoginUser.userName;
          sessionStorage.setItem("LoggedUser",JSON.stringify(this.LoggedUser));
          this.router.navigate(['/teacher/dashboard']);
        });
      } else {
        this.alertMessage('Invalid UserName', '', 'error');
      }
    }
  }
  validateLogin(): boolean {
    if (!this.LoginUser.userName) {
      this.alertMessage(
        'Username is Required',
        'Please enter your username',
        'error'
      );
      return false;
    } else if (!this.LoginUser.password) {
      this.alertMessage(
        'Password is Required',
        'Please enter your password',
        'error'
      );
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
