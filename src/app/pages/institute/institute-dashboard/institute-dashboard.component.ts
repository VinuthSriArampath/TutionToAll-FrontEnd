import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../common/institute-navbar/institute-navbar.component';

@Component({
  selector: 'app-institute-dashboard',
  standalone: true,
  imports: [InstituteNavbarComponent],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent {

}
