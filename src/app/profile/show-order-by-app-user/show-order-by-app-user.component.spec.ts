import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderByAppUserComponent } from './show-order-by-app-user.component';

describe('ShowOrderByAppUserComponent', () => {
  let component: ShowOrderByAppUserComponent;
  let fixture: ComponentFixture<ShowOrderByAppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderByAppUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderByAppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
