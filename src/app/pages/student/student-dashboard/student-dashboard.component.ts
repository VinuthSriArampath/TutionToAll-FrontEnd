import { Component } from '@angular/core';
import { StudentNavbarComponent } from "../common/student-navbar/student-navbar.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [StudentNavbarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {

}
