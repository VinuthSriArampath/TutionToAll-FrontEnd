import { Component } from '@angular/core';
import { TeacherNavbarComponent } from "../common/teacher-navbar/teacher-navbar.component";

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [TeacherNavbarComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {

}
