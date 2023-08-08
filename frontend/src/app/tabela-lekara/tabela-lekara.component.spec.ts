import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaLekaraComponent } from './tabela-lekara.component';

describe('TabelaLekaraComponent', () => {
  let component: TabelaLekaraComponent;
  let fixture: ComponentFixture<TabelaLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
