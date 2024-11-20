import { TestBed } from '@angular/core/testing';

import { FormularioHistoricoService } from './formulario-historico.service';

describe('FormularioHistoricoService', () => {
  let service: FormularioHistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioHistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
