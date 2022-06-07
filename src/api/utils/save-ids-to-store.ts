import type { KanbanBoardData } from '../../store/typings';
import type { Nullable } from '../../utils/types';

function saveIdsToStore(
  board: KanbanBoardData,
  ls: typeof window.localStorage,
  repoName: Nullable<string>,
  isUpdating?: boolean
) {
  if (board.columns) {
    const columnsOnlyId = board.columns.map((col) => {
      return {
        id: col.id,
        title: col.title,
        cards: col.cards
          ? col.cards.map((card) => ({ id: card.id, column: col.title }))
          : [],
      };
    });

    if (isUpdating) {
      if (repoName) {
        ls.setItem(repoName, JSON.stringify(columnsOnlyId));
      }
    } else {
      if (repoName) {
        const dataExists = ls.getItem(repoName);
        if (dataExists === null) {
          ls.setItem(repoName, JSON.stringify(columnsOnlyId));
        }
      }
    }
  }
}

export default saveIdsToStore;
