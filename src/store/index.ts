import React, { createContext, useContext } from 'react';
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
  currentRepoName: null,
  issuesData: { board: { columns: columnsInitData } },
  isFetching: false,
  setIsFetching: () => {
    return;
  },
  setKanbanData: () => {
    return;
  },
  setRepoName: () => {
    return;
  },
};

export const AppContext = createContext<{
  currentRepoName: Nullable<string>;
  issuesData: { board: KanbanBoardData };
  isFetching: Nullable<boolean>;
  setIsFetching: React.Dispatch<React.SetStateAction<Nullable<boolean>>>;
  setKanbanData: React.Dispatch<
    React.SetStateAction<{ board: KanbanBoardData }>
  >;
  setRepoName: React.Dispatch<React.SetStateAction<Nullable<string>>>;
}>(initValue);

export const useStore = () => useContext(AppContext);
