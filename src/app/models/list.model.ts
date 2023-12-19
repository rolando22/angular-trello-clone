import { Board } from '@models/board.model';
import { Card } from '@models/card.model';

export interface List {
  id: number
  title: string
  position: number
  cards: Card[]
  showCardForm?: boolean
}

export interface CreateListDTO extends Omit<List, 'id' | 'cards'> {
  boardId: Board['id']
}
