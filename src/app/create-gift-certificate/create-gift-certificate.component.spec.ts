import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGiftCertificateComponent } from './create-gift-certificate.component';

describe('CreateGiftCertificateComponent', () => {
  let component: CreateGiftCertificateComponent;
  let fixture: ComponentFixture<CreateGiftCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGiftCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGiftCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
