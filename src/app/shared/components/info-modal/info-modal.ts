import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  templateUrl: './info-modal.html',
  styleUrl: './info-modal.css'
})
export class InfoModalComponent {
  title = input.required<string>();
  description = input.required<string>();
  
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}