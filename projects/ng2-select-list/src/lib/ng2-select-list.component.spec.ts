import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2SelectListComponent } from './ng2-select-list.component';

describe('Ng2SelectListComponent', () => {
  let component: Ng2SelectListComponent;
  let fixture: ComponentFixture<Ng2SelectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2SelectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2SelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
