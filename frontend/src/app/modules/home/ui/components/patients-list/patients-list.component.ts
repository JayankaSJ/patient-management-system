import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PatientsService } from '../../../services/patients.service';
import { Patient } from '../../../models/Patient';
import { DatePipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ModifyPatientModalComponent } from '../modify-patient-modal/modify-patient-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HasPermissionDirective } from '../../../../../directives/has-permission.directive';

@Component({
  selector: 'patients-list',
  imports: [
    NzDividerModule,
    NzTableModule,
    DatePipe,
    NzIconModule,
    ModifyPatientModalComponent,
    HasPermissionDirective,
  ],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.scss',
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];
  isLoading: boolean = false;

  @ViewChild(ModifyPatientModalComponent)
  modifyModal!: ModifyPatientModalComponent;

  constructor(
    private patientService: PatientsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.isLoading = true;
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
        this.isLoading = false;
        this.toastr.error('Error fetching patients', 'Error', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true,
        });
      },
    });
  }

  editPatient(patient: Patient): void {
    this.modifyModal.editPatient(patient);
  }

  deletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient.id).subscribe({
      next: () => {
        this.patients = this.patients.filter((p) => p.id !== patient.id);
      },
      error: (error) => {
        console.error('Error deleting patient:', error);
      },
    });
  }

  onCompleted(): void {
    this.fetchPatients();
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    if (
      month < dob.getMonth() ||
      (month === dob.getMonth() && day < dob.getDate())
    ) {
      age--;
    }
    return age;
  }
}
