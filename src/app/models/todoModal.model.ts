import { Card } from '@models/board.model';

export interface InputData {
  column: string
  card: Card
}

export interface OutputData {
  rta: boolean
}
