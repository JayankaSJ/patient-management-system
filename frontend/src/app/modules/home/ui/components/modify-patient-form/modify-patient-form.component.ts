import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PatientsService } from '../../../services/patients.service';
import { Patient } from '../../../models/Patient';
import { ToastrService } from 'ngx-toastr';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'modify-patient-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  templateUrl: './modify-patient-form.component.html',
  styleUrl: './modify-patient-form.component.scss',
})
export class ModifyPatientFormComponent implements OnInit, OnDestroy {
  @Input() patient?: Patient;
  @Input() isCreation: boolean = false;
  @Input('onCompleted') onCompleted!: Function;

  isLoading: boolean = false;

  private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();
  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
    phoneNumber: this.fb.control('', [Validators.required]),
    dateOfBirth: this.fb.control('', [Validators.required]),
  });

  constructor(
    private patientService: PatientsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.isCreation = this.isCreation ?? false;
    if (this.patient) {
      this.validateForm.patchValue({
        email: this.patient.email,
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        phoneNumber: this.patient.phoneNumber,
        dateOfBirth: this.patient.dateOfBirth,
      });
    }

    this.validateForm.valueChanges.pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(event: MouseEvent): void {
    event?.stopPropagation();
    event?.preventDefault();

    this.isLoading = true;
    if (this.validateForm.valid) {
      const payload = this.validateForm.value as Patient;
      if (this.isCreation) {
        this.patientService
          .createPatient(payload)
          .pipe(first())
          .subscribe({
            next: () => {
              this.validateForm.reset();
              this.onCompleted();
              this.toastr.success(
                `New patient created successfully.`,
                'Creation succeeded',
              );
            },
            error: (error: unknown) => {
              this.isLoading = false;
              this.toastr.error(
                `New patient creation failed.`,
                'Creation failed',
              );
            },
            complete: () => {
              this.isLoading = false;
            },
          });
      } else {
        this.patientService
          .updatePatient(this.patient?.id as number, payload)
          .pipe(first())
          .subscribe({
            next: () => {
              this.validateForm.reset();
              this.onCompleted();
              this.toastr.success(
                `Patient updated successfully.`,
                'Update succeeded',
              );
            },
            error: (error: unknown) => {
              this.isLoading = false;
              this.toastr.error(`Patient update failed.`, 'Update failed');
            },
            complete: () => {
              this.isLoading = false;
            },
          });
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close() {
    this.validateForm.reset();
    this.onCompleted();
  }

  disableFutureDates = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current > today;
  };
}
