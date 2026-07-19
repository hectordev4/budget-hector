import { Component, signal } from '@angular/core';
import { Banner } from './features/banner/banner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Banner, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('budget-hector');
}
