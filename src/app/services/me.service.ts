import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  getMeBoards() {
    return this.http.get<Board[]>(`${this.apiUrl}/api/v1/me/boards`, { context: checkToken() });
  }
}
