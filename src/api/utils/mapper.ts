import type {
  KanbanBoardData,
  CardsEntity,
  ColumnsEntity,
} from '../../store/typings';
import type { GitIssues } from '../typings';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

const cardExistsLocally = (cols: ColumnsEntity[], currentCard: CardsEntity) => {
  const allLocalCards: CardsEntity[] = [];

  for (let i = 0; i < cols.length; i++) {
    const currentArr = cols[i].cards;
    if (currentArr) {
      allLocalCards.push(...currentArr);
    }
  }

  const cardExists = allLocalCards.find((card) => card.id === currentCard.id);

  return cardExists;
};

/**
 * Mapping incoming issues data for the board
 * @param data {GitIssues}
 * @returns {KanbanBoardData}
 */
async function apiMapper(
  data: GitIssues,
  repoName: string
): Promise<KanbanBoardData> {
  const issuesArr = data.repository.issues.edges;
  // columns cards init
  const backlogCards: CardsEntity[] = [];
  const inProgressCards: CardsEntity[] = [];
  const completedCards: CardsEntity[] = [];
  const localData = localStorage.getItem(repoName);
  const localArray: ColumnsEntity[] = localData ? JSON.parse(localData) : [];

  if (issuesArr && issuesArr.length) {
    for (const issue of issuesArr) {
      const { node } = issue;

      const card: CardsEntity = {
        id: node.id,
        title: node.title,
        description: `#${node.number} opened ${dayjs(
          node.createdAt
        ).fromNow()} by ${node.author.login}`,
        column: null,
      };

      if (localArray.length) {
        const existingCard = cardExistsLocally(localArray, card);
        if (existingCard) {
          if (existingCard.column === 'Backlog') {
            backlogCards.push(card);
          }
          if (existingCard.column === 'Completed') {
            completedCards.push(card);
          }
          if (existingCard.column === 'In Progress') {
            inProgressCards.push(card);
          }
        }
      }

      if (!cardExistsLocally(localArray, card)) {
        if (node.stateReason === null) {
          // issue has comments
          if (issue.node.comments.edges.length !== 0) {
            card.column = 'In Progress';
            inProgressCards.push(card);
          } else {
            card.column = 'Backlog';
            backlogCards.push(card);
          }
        }

        if (node.stateReason === 'COMPLETED') {
          card.column = 'Completed';
          completedCards.push(card);
        }
      }
    }
  }

  const finalBoardData: KanbanBoardData = {
    columns: [
      {
        id: 1,
        title: 'Backlog',
        cards: backlogCards,
      },
      {
        id: 2,
        title: 'In Progress',
        cards: inProgressCards,
      },
      {
        id: 3,
        title: 'Completed',
        cards: completedCards,
      },
    ],
  };

  return finalBoardData;
}

export default apiMapper;
