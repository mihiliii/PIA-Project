import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentProfilComponent } from './pacijent-profil.component';

describe('PacijentProfilComponent', () => {
  let component: PacijentProfilComponent;
  let fixture: ComponentFixture<PacijentProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
