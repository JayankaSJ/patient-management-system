import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPatientModalComponent } from './modify-patient-modal.component';

describe('ModifyPatientModalComponent', () => {
  let component: ModifyPatientModalComponent;
  let fixture: ComponentFixture<ModifyPatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPatientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
