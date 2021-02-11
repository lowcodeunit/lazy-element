import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyElementsComponent } from './lazy-elements.component';

describe('LazyElementsComponent', () => {
  let component: LazyElementsComponent;
  let fixture: ComponentFixture<LazyElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
