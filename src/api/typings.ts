export type ApiQueryProps = {
  owner: string;
  repo: string;
};

export interface GitIssues {
  repository: Repository;
}

export interface Repository {
  id: string;
  issues: Issues;
}

export interface Issues {
  edges?: EdgesEntity[] | null;
}

export interface EdgesEntity {
  node: Node;
}

export interface Node {
  id: string;
  closed: boolean;
  stateReason?: 'COMPLETED' | 'NOT_PLANNED' | null;
  title: string;
  createdAt: string;
  number: number;
  author: Author;
  comments: {
    edges: string[];
  };
}

export interface Author {
  login: string;
}
