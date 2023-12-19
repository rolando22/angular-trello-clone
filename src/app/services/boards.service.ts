import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board, CreateBoardDTO } from '@models/board.model';
import { Card } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private apiUrl = environment.API_URL;
  private bufferSpace = 65535;

  constructor(
    private http: HttpClient,
  ) { }

  getOne({ id }: { id: Board['id'] }) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, { context: checkToken() });
  }

  create(dto: CreateBoardDTO) {
    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards/`, dto, { context: checkToken() });
  }

  getPosition({ cards, currentIndex }: { cards: Card[], currentIndex: number }) {
    if (cards.length === 1) {
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position;
      return onTopPosition / 2;
    }
    if (cards.length > 2 && currentIndex > 0 && currentIndex < cards.length - 1) {
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === cards.length - 1) {
      const onBottomPosition = cards[currentIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }

  getPositionNewCard({ cards }: { cards: Card[] }) {
    if (cards.length === 0) {
      return this.bufferSpace;
    }
    const onBottomPosition = cards[cards.length - 1].position;
    return onBottomPosition + this.bufferSpace;
  }
}
