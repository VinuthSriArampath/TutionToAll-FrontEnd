import { Component } from '@angular/core';
import { FooterComponent } from "../../../common/footer/footer.component";
import { InstituteNavbarComponent } from "../../institute/common/institute-navbar/institute-navbar.component";

@Component({
  selector: 'app-institute-register-teacher',
  standalone: true,
  imports: [FooterComponent, InstituteNavbarComponent],
  templateUrl: './institute-register-teacher.component.html',
  styleUrl: './institute-register-teacher.component.css'
})
export class InstituteRegisterTeacherComponent {

}
