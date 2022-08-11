import { TestBed } from '@angular/core/testing';

import { GiftCertificate.ServiceService } from './gift-certificate.service.service';

describe('GiftCertificate.ServiceService', () => {
  let service: GiftCertificate.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftCertificate.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
