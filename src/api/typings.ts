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
  stateReason?: null;
  title: string;
  publishedAt: string;
  number: number;
  author: Author;
}

export interface Author {
  login: string;
}
