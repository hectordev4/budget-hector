import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { UserFormData } from '@models/UserFormData';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  private fb = inject(NonNullableFormBuilder);
  
  formSubmit = output<UserFormData>();

  // Build the underlying form controls group contract
  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.userForm.invalid) return;

    // 1. Send the strongly typed form value upstream
    this.formSubmit.emit(this.userForm.getRawValue());

    // 2. Wipe all fields completely clean and reset the dirty/touched validations status
    this.userForm.reset();
  }
}