import { Card } from '@models/card.model';

export interface InputData {
  column: string
  card: Card
}

export interface OutputData {
  rta: boolean
}
