import { TestBed } from '@angular/core/testing';

import { CareerGoalService } from './career-goal.service';

describe('CareerGoalService', () => {
  let service: CareerGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
