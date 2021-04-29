import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCarUpdateComponent } from './popup-car-update.component';

describe('PopupCarUpdateComponent', () => {
  let component: PopupCarUpdateComponent;
  let fixture: ComponentFixture<PopupCarUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCarUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCarUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
