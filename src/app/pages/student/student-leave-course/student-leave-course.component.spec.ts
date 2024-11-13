import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveCourseComponent } from './student-leave-course.component';

describe('StudentLeaveCourseComponent', () => {
  let component: StudentLeaveCourseComponent;
  let fixture: ComponentFixture<StudentLeaveCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLeaveCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLeaveCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
