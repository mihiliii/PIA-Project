import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledEditComponent } from './pregled-edit.component';

describe('PregledEditComponent', () => {
  let component: PregledEditComponent;
  let fixture: ComponentFixture<PregledEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
