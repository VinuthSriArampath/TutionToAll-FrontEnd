import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteAddCourseComponent } from './institute-add-course.component';

describe('InstituteAddCourseComponent', () => {
  let component: InstituteAddCourseComponent;
  let fixture: ComponentFixture<InstituteAddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteAddCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
