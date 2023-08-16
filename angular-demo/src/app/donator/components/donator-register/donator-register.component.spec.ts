import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorRegisterComponent } from './donator-register.component';

describe('DonatorRegisterComponent', () => {
  let component: DonatorRegisterComponent;
  let fixture: ComponentFixture<DonatorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatorRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
