import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteRegistrationOtpComponent } from './institute-registration-otp.component';

describe('InstituteRegistrationOtpComponent', () => {
  let component: InstituteRegistrationOtpComponent;
  let fixture: ComponentFixture<InstituteRegistrationOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteRegistrationOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteRegistrationOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
