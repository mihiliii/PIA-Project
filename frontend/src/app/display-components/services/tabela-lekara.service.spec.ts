import { TestBed } from '@angular/core/testing';

import { TabelaLekaraService } from './tabela-lekara.service';

describe('TabelaLekaraService', () => {
  let service: TabelaLekaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaLekaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
