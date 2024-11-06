import { Component } from '@angular/core';
import { FooterComponent } from '../../../common/footer/footer.component';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-institute-register-teacher',
  standalone: true,
  imports: [FooterComponent, InstituteNavbarComponent,FormsModule,CommonModule],
  templateUrl: './institute-register-teacher.component.html',
  styleUrl: './institute-register-teacher.component.css',
})
export class InstituteRegisterTeacherComponent {
  public ConfirmPassword: string = '';
  public isRegistered:Boolean=false;
  public teacher: any = {
    firstName: '',
    lastName: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    password: '',
  };
  constructor(private router: Router) {}
  public cancel() {
    this.clearData();
  }
  private clearData() {
    this.teacher = {
      firstName: '',
      lastName: '',
      dob: '',
      contact: '',
      email: '',
      address: '',
      password: '',
    };
    this.isRegistered=false;
    this.ConfirmPassword='';
  }
}
