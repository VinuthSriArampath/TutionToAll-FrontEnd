import { Component } from '@angular/core';
import { InstituteNavbarComponent } from '../../institute/common/institute-navbar/institute-navbar.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [
    InstituteNavbarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css',
})
export class DeleteCourseComponent {
  public searchedCourseId: String = '';
  
  public searchCourse(){

  }
}
