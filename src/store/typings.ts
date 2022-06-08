import { Nullable } from '../utils/types';

export interface KanbanBoardData {
  columns?: ColumnsEntity[] | null;
}

export interface ColumnsEntity {
  id: number;
  title: string;
  cards?: CardsEntity[] | null;
}

export interface CardsEntity {
  id: string;
  title: string;
  description: string;
  column: Nullable<'Backlog' | 'In Progress' | 'Completed'>;
}
