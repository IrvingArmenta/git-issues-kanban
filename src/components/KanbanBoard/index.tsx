import React, { FC, useState } from 'react';
import Board, { moveCard } from '@asseinfo/react-kanban';
import ErrorBoundary from '../ErrorBoundary';
import { CardsEntity, KanbanBoardData } from '../../store/typings';
import { useStore } from '../../store';
// css
import '@asseinfo/react-kanban/dist/styles.css';
import './styles.css';

const KanbanBoard: FC = () => {
  const { issuesData } = useStore();
  const [controlledBoard, setBoard] = useState(issuesData.board);

  function handleCardMove(_card: any, source: any, destination: any) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <ErrorBoundary>
      <div>
        {JSON.stringify(controlledBoard, null, 2)}
        {controlledBoard && (
          <Board onCardDragEnd={handleCardMove} disableColumnDrag={true}>
            {controlledBoard}
          </Board>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default KanbanBoard;
