import type { KanbanBoardData, CardsEntity } from '../store/typings';
import type { GitIssues } from './typings';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

/**
 * Mapping incoming issues data for the board
 * @param data {GitIssues}
 * @returns {KanbanBoardData}
 */
async function apiMapper(data: GitIssues): Promise<KanbanBoardData> {
  const storageId = data.repository.id;
  const issuesArr = data.repository.issues.edges;
  // columns cards init
  const backlogCards: CardsEntity[] = [];
  const inProgressCards: CardsEntity[] = [];
  const completedCards: CardsEntity[] = [];

  if (issuesArr && issuesArr.length) {
    for (const issue of issuesArr) {
      const { node } = issue;

      const card: CardsEntity = {
        id: node.id,
        title: node.title,
        description: `#${node.number} opened ${dayjs(
          node.createdAt
        ).fromNow()} by ${node.author.login}`,
      };

      if (node.stateReason === null) {
        // issue has comments
        if (issue.node.comments.edges.length !== 0) {
          inProgressCards.push(card);
        } else {
          backlogCards.push(card);
        }
      }

      if (node.stateReason === 'COMPLETED') {
        completedCards.push(card);
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
