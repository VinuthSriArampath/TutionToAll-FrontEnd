import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteRegisterTeacherComponent } from './institute-register-teacher.component';

describe('InstituteRegisterTeacherComponent', () => {
  let component: InstituteRegisterTeacherComponent;
  let fixture: ComponentFixture<InstituteRegisterTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteRegisterTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteRegisterTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
