import { createContext, useContext } from 'react';
import type { ApiQueryProps } from '../api/typings';
import type { Nullable } from '../utils/types';
import type { ColumnsEntity, KanbanBoardData } from './typings';

export const columnsInitData: ColumnsEntity[] = [
  {
    id: 1,
    title: 'Backlog',
    cards: [],
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [],
  },
  {
    id: 3,
    title: 'Completed',
    cards: [],
  },
];

export const initValue = {
  apiQueryProps: null,
  issuesData: { board: { columns: columnsInitData }, issuesExist: false },
};

export const AppContext = createContext<{
  apiQueryProps: Nullable<ApiQueryProps>;
  issuesData: { board: KanbanBoardData; issuesExist: boolean };
}>(initValue);

export const useStore = () => useContext(AppContext);
