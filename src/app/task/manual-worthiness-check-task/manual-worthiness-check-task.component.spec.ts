import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualWorthinessCheckTaskComponent } from './manual-worthiness-check-task.component';

describe('ManualWorthinessCheckTaskComponent', () => {
  let component: ManualWorthinessCheckTaskComponent;
  let fixture: ComponentFixture<ManualWorthinessCheckTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualWorthinessCheckTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualWorthinessCheckTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
