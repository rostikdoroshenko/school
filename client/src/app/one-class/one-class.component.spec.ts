import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneClassComponent } from './one-class.component';

describe('OneClassComponent', () => {
  let component: OneClassComponent;
  let fixture: ComponentFixture<OneClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
