import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProfileComponent } from './institute-profile.component';

describe('InstituteProfileComponent', () => {
  let component: InstituteProfileComponent;
  let fixture: ComponentFixture<InstituteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
