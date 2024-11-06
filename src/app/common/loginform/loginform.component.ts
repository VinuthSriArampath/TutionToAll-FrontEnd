import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Hearder1Component } from "../headers/hearder-1/hearder-1.component";
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient,private router: Router) {
    this.http.get('http://localhost:8080/institutes/all').subscribe(res => this.institutes = res as any[]);
    this.http.get('http://localhost:8080/students/all').subscribe(res => this.students = res as any[]);
    this.http.get('http://localhost:8080/teachers/all').subscribe(res => this.teachers = res as any[]);
  }
  login(){
    console.log();
    
    swal.fire({
      title: "Login Successful!",
      text: `Welcome ${this.username}`,
      icon: "success",
      confirmButtonText: "Continue"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/institute/register']);
      }
    });
  }
}
