import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-institute-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './institute-navbar.component.html',
  styleUrl: './institute-navbar.component.css'
})
export class InstituteNavbarComponent {
  constructor(private router:Router){}
  logout(){
    sessionStorage.removeItem("LoggedUser");
    this.router.navigate(['/']);
  }
}
