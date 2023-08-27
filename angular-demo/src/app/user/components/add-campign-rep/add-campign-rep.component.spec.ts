import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampignREPComponent } from './add-campign-rep.component';

describe('AddCampignREPComponent', () => {
  let component: AddCampignREPComponent;
  let fixture: ComponentFixture<AddCampignREPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampignREPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampignREPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
