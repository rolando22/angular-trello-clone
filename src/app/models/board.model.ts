import { User } from '@models/user.model';
import { Card } from '@models/card.model';
import { List } from '@models/list.model';
import { color } from '@models/color.model';

export interface Board {
  id: number
  title: string
  backgroundColor: color
  members: User[]
  lists: List[]
  cards: Card[]
}

export interface CreateBoardDTO extends Omit<Board, 'id' | 'members' | 'lists' | 'cards'> {}
