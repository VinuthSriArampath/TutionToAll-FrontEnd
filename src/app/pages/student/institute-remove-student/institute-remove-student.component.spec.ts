import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteRemoveStudentComponent } from './institute-remove-student.component';

describe('InstituteRemoveStudentComponent', () => {
  let component: InstituteRemoveStudentComponent;
  let fixture: ComponentFixture<InstituteRemoveStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteRemoveStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteRemoveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
