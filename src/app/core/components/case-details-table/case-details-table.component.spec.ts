import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetailsTableComponent } from './case-details-table.component';

describe('CaseDetailsTableComponent', () => {
  let component: CaseDetailsTableComponent;
  let fixture: ComponentFixture<CaseDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
