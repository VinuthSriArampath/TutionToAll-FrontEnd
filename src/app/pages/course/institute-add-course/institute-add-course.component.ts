import { Component } from '@angular/core';
import { InstituteNavbarComponent } from "../../institute/common/institute-navbar/institute-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";

@Component({
  selector: 'app-institute-add-course',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent],
  templateUrl: './institute-add-course.component.html',
  styleUrl: './institute-add-course.component.css'
})
export class InstituteAddCourseComponent {

}
