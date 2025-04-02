import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModifyPatientModalComponent } from './components/modify-patient-modal/modify-patient-modal.component';
import { HasPermissionDirective } from '../../../directives/has-permission.directive';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    PatientsListComponent,
    ModifyPatientModalComponent,
    HasPermissionDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild(ModifyPatientModalComponent)
  modifyModal!: ModifyPatientModalComponent;
  @ViewChild(PatientsListComponent)
  patientsList!: PatientsListComponent;

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  addPatient() {
    this.modifyModal.createNewPatient();
  }

  onCompleted() {
    this.patientsList.fetchPatients();
  }
}
