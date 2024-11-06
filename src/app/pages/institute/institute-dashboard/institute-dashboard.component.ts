import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../common/institute-navbar/institute-navbar.component';
import { FooterComponent } from "../../../common/footer/footer.component";
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-institute-dashboard',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent, AppComponent],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent {

}
