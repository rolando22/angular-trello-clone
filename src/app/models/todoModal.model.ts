import { ToDo } from "./todo.model";

export interface InputData {
  column: string
  todo: ToDo
}

export interface OutputData {
  rta: boolean
}
