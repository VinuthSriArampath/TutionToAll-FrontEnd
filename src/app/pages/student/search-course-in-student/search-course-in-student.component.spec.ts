import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourseInStudentComponent } from './search-course-in-student.component';

describe('SearchCourseInStudentComponent', () => {
  let component: SearchCourseInStudentComponent;
  let fixture: ComponentFixture<SearchCourseInStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCourseInStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCourseInStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
