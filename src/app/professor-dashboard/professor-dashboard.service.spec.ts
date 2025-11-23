import { TestBed } from '@angular/core/testing';

import { ProfessorDashboardService } from './professor-dashboard.service';

describe('ProfessorDashboardService', () => {
  let service: ProfessorDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
