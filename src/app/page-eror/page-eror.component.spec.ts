import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErorComponent } from './page-eror.component';

describe('PageErorComponent', () => {
  let component: PageErorComponent;
  let fixture: ComponentFixture<PageErorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageErorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageErorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
