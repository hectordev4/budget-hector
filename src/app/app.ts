import { Component, signal } from '@angular/core';
import { Banner } from './features/banner/banner';
import { Overview } from './features/overview/overview';

@Component({
  selector: 'app-root',
  imports: [Banner, Overview],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('budget-hector');
}
