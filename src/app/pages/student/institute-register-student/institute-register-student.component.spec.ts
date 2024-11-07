import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteRegisterStudentComponent } from './institute-register-student.component';

describe('InstituteRegisterStudentComponent', () => {
  let component: InstituteRegisterStudentComponent;
  let fixture: ComponentFixture<InstituteRegisterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteRegisterStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteRegisterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
