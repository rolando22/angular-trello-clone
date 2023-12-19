import { User } from '@models/user.model';
import { Card } from '@models/card.model';
import { colorCard } from '@models/color.model';

export interface List {
  id: number
  title: string
  position: number
  cards: Card[]
  showCardForm?: boolean
}

export interface Board {
  id: number
  title: string
  backgroundColor: colorCard
  members: User[]
  lists: List[]
  cards: Card[]
}

export interface CreateBoardDTO extends Omit<Board, 'id' | 'members' | 'lists' | 'cards'> {}
