import { User } from '@models/user.model';
import { colorCard } from '@models/color.model';

export interface Card {
  id: string
  title: string
  description: string
  position: number
  list: List
}

export interface List {
  id: string
  title: string
  position: number
  cards: Card[]
}

export interface Board {
  id: string
  title: string
  backgroundColor: colorCard
  members: User[]
  lists: List[]
  cards: Card[]
}
