import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hearder1Component } from './hearder-1.component';

describe('Hearder1Component', () => {
  let component: Hearder1Component;
  let fixture: ComponentFixture<Hearder1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hearder1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hearder1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
