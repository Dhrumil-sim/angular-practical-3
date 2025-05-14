export interface Note {
  title: string;
  description: string;
  date: string | Date;
  state: CardState;
}
export enum CardState {
  Static = 'static',
  New = 'new',
  Edited = 'edited',
  Deleted = 'deleted',
}
