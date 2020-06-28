import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundSearchComponent } from '././bound-search.component

describe('BoundedSearchComponent', () => {
  let component: BoundSearchComponent;
  let fixture: ComponentFixture<BoundSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
