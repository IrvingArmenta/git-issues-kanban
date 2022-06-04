export interface KanbanBoardData {
  columns?: ColumnsEntity[] | null;
}

export interface ColumnsEntity {
  id: number;
  title: string;
  cards?: CardsEntity[] | null;
}

export interface CardsEntity {
  id: number;
  title: string;
  description: string;
}
