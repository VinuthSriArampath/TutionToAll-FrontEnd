import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStudentInInstituteComponent } from './search-student-in-institute.component';

describe('SearchStudentInInstituteComponent', () => {
  let component: SearchStudentInInstituteComponent;
  let fixture: ComponentFixture<SearchStudentInInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchStudentInInstituteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStudentInInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
