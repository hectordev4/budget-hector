import { Component, input, output, inject, DestroyRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css']
})
export class BudgetCheckbox implements OnInit {
  // Configurable label (e.g., "Afegir")
  label = input<string>('Afegir');
  
  // Emits 'true' when checked, 'false' when unchecked
  checkedChange = output<boolean>();

  checkboxControl = new FormControl<boolean>(false, { nonNullable: true });
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Reactively listen to internal checkbox state and emit to parent
    this.checkboxControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.checkedChange.emit(value);
      });
  }
}