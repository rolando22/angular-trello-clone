import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card, CreateCardDTO, UpdateCardDTO } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  create(dto: CreateCardDTO) {
    return this.http.post<Card>(`${this.apiUrl}/api/v1/cards`, dto, { context: checkToken() });
  }

  update({ id, changes }: { id: Card['id'], changes: UpdateCardDTO }) {
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, { context: checkToken() });
  }
}
