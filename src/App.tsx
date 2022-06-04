import React from 'react';
import { useState } from 'react';
import { RepoFetchInput, KanbanBoard } from './components';
// app styles
import './css/app.css';
import { AppContext, initValue } from './store';
import { KanbanBoardData } from './store/typings';
import { Nullable } from './utils/types';

function App() {
  const [kanbanData, setKanbanData] = useState<KanbanBoardData>(
    initValue.issuesData.board
  );
  const [isFetching, setIsFetching] = useState<Nullable<boolean>>(null);
  const [repoName, setRepoName] = useState<Nullable<string>>(null);

  return (
    <div className="app container">
      <AppContext.Provider
        value={{
          currentRepoName: repoName,
          issuesData: { board: kanbanData },
          isFetching,
          actions: { setIsFetching, setKanbanData, setRepoName },
        }}
      >
        <RepoFetchInput />
        <KanbanBoard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
