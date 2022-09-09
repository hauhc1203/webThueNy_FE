import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderDetailComponent } from './show-order-detail.component';

describe('ShowOrderDetailComponent', () => {
  let component: ShowOrderDetailComponent;
  let fixture: ComponentFixture<ShowOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
