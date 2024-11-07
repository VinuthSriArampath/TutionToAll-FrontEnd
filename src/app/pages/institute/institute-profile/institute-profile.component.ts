import { Component } from '@angular/core';
import { InstituteNavbarComponent } from "../common/institute-navbar/institute-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-institute-profile',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent,RouterLink],
  templateUrl: './institute-profile.component.html',
  styleUrl: './institute-profile.component.css'
})
export class InstituteProfileComponent {
  editSwitch(){
    console.log("Edit Switch");
  }
}
