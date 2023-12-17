import { List } from '@models/board.model';

export interface Card {
  id: string
  title: string
  description: string
  position: number
  list: List
}

export interface CreateCardDTO extends Omit<Card, 'id' | 'list'> {
  listId: number
  boardId: number
}

export interface UpdateCardDTO extends Partial<CreateCardDTO> {}
