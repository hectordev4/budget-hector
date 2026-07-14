import { Component, signal } from '@angular/core';
import { Banner } from './components/banner/banner';
import { Card } from './components/card/card';

@Component({
  selector: 'app-root',
  imports: [Banner, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('budget-hector');
}
