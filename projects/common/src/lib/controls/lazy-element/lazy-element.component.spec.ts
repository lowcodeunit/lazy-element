import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyElementComponent } from './lazy-element.component';

describe('LazyElementComponent', () => {
  let component: LazyElementComponent;
  let fixture: ComponentFixture<LazyElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
