import { columnsInitData } from '../store';
import { KanbanBoardData } from '../store/typings';
import { GitIssues } from './typings';

/**
 * Mapping incoming issues data for the board
 * @param data {GitIssues}
 * @returns {KanbanBoardData}
 */
function apiMapper(data: GitIssues): KanbanBoardData {
  console.log(data);
  const cols: KanbanBoardData = {
    columns: columnsInitData,
  };

  return cols;
}

export default apiMapper;
