import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChifoumiComponent } from './chifoumi.component';

describe('ChifoumiComponent', () => {
  let component: ChifoumiComponent;
  let fixture: ComponentFixture<ChifoumiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChifoumiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChifoumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
