import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './info-modal.html',
  styleUrl: './info-modal.css'
})
export class InfoModal {
  // Inject Material Dialog helpers to grab input data and manage closing
  dialogRef = inject(MatDialogRef<InfoModal>);
  data = inject<{ title: string; description: string }>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}