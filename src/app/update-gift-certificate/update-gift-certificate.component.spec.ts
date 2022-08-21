import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGiftCertificateComponent } from './update-gift-certificate.component';

describe('UpdateGiftCertificateComponent', () => {
  let component: UpdateGiftCertificateComponent;
  let fixture: ComponentFixture<UpdateGiftCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGiftCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGiftCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
