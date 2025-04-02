import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../../../services/identity.service';

@Component({
  selector: 'login-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private toastr: ToastrService
  ) {}

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value;
      this.isLoading = true;

      this.identityService
        .login(username as string, password as string)
        .subscribe({
          next: (response: unknown) => {
            this.router.navigate(['/']);
          },
          error: (error: unknown) => {
            console.error('Login failed', error);
            this.isLoading = false;
            this.toastr.error(`Please check your credentials.`, 'Login failed');
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
