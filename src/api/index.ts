import { graphql, GraphqlResponseError } from '@octokit/graphql';
import apiMapper from './mapper';
import { GitIssues } from './typings';

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.REACT_APP_PERSONAL_TOKEN}`,
  },
});

async function api(repoUrl: string) {
  const urlArr = repoUrl.split('/').filter((str) => str !== '');
  const owner = urlArr[urlArr.length - 2];
  const repo = urlArr[urlArr.length - 1];

  try {
    const data = await graphqlWithAuth<GitIssues>({
      query: `query issues($owner: String!, $repo: String!, $num: Int = 100) {
        repository(name:$repo, owner:$owner) {
            id
            issues(last:$num) {
              edges {
                node {
                  id
                  closed
                  stateReason
                  title
                  publishedAt
                  number
                  author {
                    login
                  }
                }
              }
            }
          }
        }`,
      owner,
      repo,
    });

    const mappedData = apiMapper(data);

    return mappedData;
  } catch (err) {
    if (err instanceof GraphqlResponseError) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Request failed:', err.request);
        console.log(err.message);
      }
      return { error: { message: err.message } };
    } else {
      const otherError = err as Error;
      return { error: { message: otherError.message } };
    }
  }
}

export default api;
