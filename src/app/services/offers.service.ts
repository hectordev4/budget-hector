import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private http = inject(HttpClient);
  
  private jsonUrl = 'data/MockData.json'; 

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.jsonUrl);
  }
}