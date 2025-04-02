import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPatientFormComponent } from './modify-patient-form.component';

describe('ModifyPatientFormComponent', () => {
  let component: ModifyPatientFormComponent;
  let fixture: ComponentFixture<ModifyPatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPatientFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
