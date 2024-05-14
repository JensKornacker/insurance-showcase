import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrateReactComponent } from './integrate-react.component';

describe('IntegrateReactdComponent', () => {
  let component: IntegrateReactComponent;
  let fixture: ComponentFixture<IntegrateReactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntegrateReactComponent]
    });
    fixture = TestBed.createComponent(IntegrateReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
