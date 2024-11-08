import { Component } from '@angular/core';
import { InstituteNavbarComponent } from "../../institute/common/institute-navbar/institute-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";

@Component({
  selector: 'app-manage-course',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent],
  templateUrl: './manage-course.component.html',
  styleUrl: './manage-course.component.css'
})
export class ManageCourseComponent {
search(){
  
}
}
