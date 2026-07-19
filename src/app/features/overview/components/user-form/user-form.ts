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

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.formSubmit.emit(this.userForm.getRawValue());

    this.userForm.reset();
  }
}