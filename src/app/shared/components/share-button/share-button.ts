import { Component, input, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { ShareDataInput } from './share-button.types'

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './share-button.html',
  styleUrl: './share-button.css'
})
export class ShareButton {
  private clipboard = inject(Clipboard);

  shareData = input.required<ShareDataInput>();
  label = input<string>('Compartir');
  ariaLabel = input<string>('Compartir la informació del pressupost');

  copied = signal<boolean>(false);

  async handleShare(): Promise<void> {
    const data = this.shareData();
    const shareUrl = data.url || window.location.href;
    console.log('promise')

    if (navigator.share) {
      try {
        console.log('try')
        await navigator.share({
          title: data.title,
          text: data.text,
          url: shareUrl
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    const copiedSuccessfully = this.clipboard.copy(shareUrl);
    if (copiedSuccessfully) {
      this.copied.set(true);
      console.log('true')
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}