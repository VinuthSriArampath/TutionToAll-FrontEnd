import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteNavbarComponent } from './institute-navbar.component';

describe('InstituteNavbarComponent', () => {
  let component: InstituteNavbarComponent;
  let fixture: ComponentFixture<InstituteNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
