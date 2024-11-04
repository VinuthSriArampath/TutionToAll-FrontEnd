import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteRegistrationComponent } from './institute-registration.component';

describe('InstituteRegistrationComponent', () => {
  let component: InstituteRegistrationComponent;
  let fixture: ComponentFixture<InstituteRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
