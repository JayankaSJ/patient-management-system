import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModifyPatientFormComponent } from '../modify-patient-form/modify-patient-form.component';
import { Patient } from '../../../models/Patient';

@Component({
  selector: 'modify-patient-modal',
  imports: [NzButtonModule, NzModalModule, ModifyPatientFormComponent],
  templateUrl: './modify-patient-modal.component.html',
  styleUrl: './modify-patient-modal.component.scss',
})
export class ModifyPatientModalComponent {
  isVisible = false;
  isCreation = false;
  title = 'Create Patient';
  patient?: Patient;

  @Input('onCompleted') onCompleted!: Function;

  createNewPatient(): void {
    this.isCreation = true;
    this.isVisible = true;
    this.title = 'Create Patient';
  }

  editPatient(patient: Patient): void {
    this.isCreation = false;
    this.isVisible = true;
    this.title = 'Edit Patient';
    this.patient = patient;
  }

  hide(): void {
    this.isVisible = false;
  }

  onFormActionCompleted(): void {
    this.isVisible = false;
    this?.onCompleted();
  }
}
