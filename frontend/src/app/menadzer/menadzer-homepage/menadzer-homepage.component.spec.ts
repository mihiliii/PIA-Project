import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerHomepageComponent } from './menadzer-homepage.component';

describe('MenadzerHomepageComponent', () => {
  let component: MenadzerHomepageComponent;
  let fixture: ComponentFixture<MenadzerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
