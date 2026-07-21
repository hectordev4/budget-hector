import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SavedQuote, ContractedService } from '@models/SavedQuote';
import { EncodedQuotePayload } from '@models/QuotePayload';
import { ShareButton } from '@shared/components/share-button/share-button';

@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ShareButton],
  templateUrl: './quote-detail.html',
  styleUrl: './quote-detail.css'
})
export class QuoteDetail implements OnInit {
  private route = inject(ActivatedRoute);
  quote = signal<SavedQuote | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      try {
        const decodedJson = decodeURIComponent(atob(idParam));
        const data: EncodedQuotePayload = JSON.parse(decodedJson);

        let finalDate = new Date();
        if (data.d) {
          const parts = data.d.split('/');
          if (parts.length === 3) {
            finalDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
          }
        }

        this.quote.set({
          id: 0,
          clientName: data.n,
          clientEmail: data.e,
          clientPhone: data.p,
          date: finalDate,
          totalPrice: data.t,
          services: data.s.map((service) => ({
            name: service.t,
            basePrice: service.base,
            pages: service.pages,
            languages: service.langs
          }))
        });
      } catch (error) {
        console.error('Error decoding parameter token.', error);
      }
    }
  }

  calculateServiceTotal(service: ContractedService): number {
    const base = Number(service.basePrice) || 0;
    const pagesCost = (Number(service.pages) || 0) * 30;
    const langsCost = (Number(service.languages) || 0) * 30;
    return base + pagesCost + langsCost;
  }

  exportToPDF(): void {
    window.print();
  }
}