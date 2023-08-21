import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLekarComponent } from './new-lekar.component';

describe('NewLekarComponent', () => {
  let component: NewLekarComponent;
  let fixture: ComponentFixture<NewLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
