import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificatesByTagComponent } from './gift-certificates-by-tag.component';

describe('GiftCertificatesByTagComponent', () => {
  let component: GiftCertificatesByTagComponent;
  let fixture: ComponentFixture<GiftCertificatesByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificatesByTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificatesByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
