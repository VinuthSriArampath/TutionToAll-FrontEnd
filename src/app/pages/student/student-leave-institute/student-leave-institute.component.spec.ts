import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveInstituteComponent } from './student-leave-institute.component';

describe('StudentLeaveInstituteComponent', () => {
  let component: StudentLeaveInstituteComponent;
  let fixture: ComponentFixture<StudentLeaveInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLeaveInstituteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLeaveInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
