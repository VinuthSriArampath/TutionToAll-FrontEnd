import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTeacherFromInstituteComponent } from './remove-teacher-from-institute.component';

describe('RemoveTeacherFromInstituteComponent', () => {
  let component: RemoveTeacherFromInstituteComponent;
  let fixture: ComponentFixture<RemoveTeacherFromInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveTeacherFromInstituteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveTeacherFromInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
