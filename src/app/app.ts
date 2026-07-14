import { Component, signal } from '@angular/core';
import { Banner } from './components/banner/banner';
import { Overview } from './pages/overview/overview';

@Component({
  selector: 'app-root',
  imports: [Banner, Overview],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('budget-hector');
}
