import React, { FC, useState } from 'react';
import Board, { moveCard } from '@asseinfo/react-kanban';
import ErrorBoundary from '../ErrorBoundary';
import { useStore } from '../../store';

// css
import '@asseinfo/react-kanban/dist/styles.css';
import './styles.css';
import { useUpdateEffect } from '../../hooks';

const KanbanBoard: FC = () => {
  const { issuesData, isFetching, actions, currentRepoName } = useStore();
  const [controlledBoard, setBoard] = useState(issuesData.board);

  useUpdateEffect(() => {
    setBoard(issuesData.board);
  }, [isFetching]);

  function handleCardMove(_card: any, source: any, destination: any) {
    const updatedBoard = moveCard(controlledBoard, source, destination);

    setBoard(updatedBoard);
    // updating context
    actions.setKanbanData(updatedBoard);
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

          {controlledBoard && isFetching === false && (
            <Board onCardDragEnd={handleCardMove} disableColumnDrag={true}>
              {controlledBoard}
            </Board>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default KanbanBoard;
