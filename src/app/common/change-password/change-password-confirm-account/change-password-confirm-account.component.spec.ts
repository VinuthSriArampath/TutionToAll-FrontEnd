import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordConfirmAccountComponent } from './change-password-confirm-account.component';

describe('ChangePasswordConfirmAccountComponent', () => {
  let component: ChangePasswordConfirmAccountComponent;
  let fixture: ComponentFixture<ChangePasswordConfirmAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordConfirmAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordConfirmAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
