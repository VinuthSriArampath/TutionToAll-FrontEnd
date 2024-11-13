import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInstituteInStudentComponent } from './search-institute-in-student.component';

describe('SearchInstituteInStudentComponent', () => {
  let component: SearchInstituteInStudentComponent;
  let fixture: ComponentFixture<SearchInstituteInStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInstituteInStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInstituteInStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
