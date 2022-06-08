import React, { FC } from 'react';
import Board, { moveCard } from '@asseinfo/react-kanban';
import ErrorBoundary from '../ErrorBoundary';
import { useStore } from '../../store';
import { useUpdateEffect } from '../../hooks';
import { saveIdsToStore } from '../../api/utils';

// css
import '@asseinfo/react-kanban/dist/styles.css';
import './styles.css';

const KanbanBoard: FC = () => {
  const { issuesData, isFetching, setKanbanData, currentRepoName } = useStore();

  useUpdateEffect(() => {
    if (isFetching === false) {
      // setting initial data to store
      saveIdsToStore(issuesData.board, window.localStorage, currentRepoName);
    }
  }, [isFetching]);

  function handleCardMove(_card: any, source: any, destination: any) {
    const updatedBoard = moveCard(issuesData.board, source, destination);

    setKanbanData({ board: updatedBoard });
    // updating local storage
    saveIdsToStore(updatedBoard, window.localStorage, currentRepoName, true);
  }

  return (
    <ErrorBoundary>
      <section className="react-kanban-section">
        {currentRepoName && <h2>{currentRepoName}</h2>}
        <div className="react-kanban-wrap">
          {isFetching && (
            <div className="spinner-wrap">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {issuesData.board && isFetching === false && (
            <Board onCardDragEnd={handleCardMove} disableColumnDrag={true}>
              {issuesData.board}
            </Board>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default KanbanBoard;
