import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-navbar.component.html',
  styleUrl: './teacher-navbar.component.css'
})
export class TeacherNavbarComponent {
  constructor(private router:Router){}
  logout(){
    sessionStorage.removeItem("LoggedUser");
    this.router.navigate(['/']);
  }
}
