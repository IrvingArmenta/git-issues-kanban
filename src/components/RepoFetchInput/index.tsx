import React, { FC, memo, useState } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import api from '../../api';
import { useUpdateEffect } from '../../hooks';
import { initValue, useStore } from '../../store';
import ErrorBoundary from '../ErrorBoundary';

// css
import './styles.css';

const RepoFetchInput: FC = () => {
  const { setIsFetching, setRepoName, setKanbanData } = useStore();
  const [inputValue, setInputValue] = useState<string>();
  const [repoUrl, setRepoUrl] = useState<string>();
  const [inputError, setInputError] = useState<string>();
  const { data: columnsData } = useSWRImmutable(repoUrl ? repoUrl : null, api);
  const { cache } = useSWRConfig();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(null);
    setIsFetching(null);
    setRepoUrl(undefined);
    setKanbanData((prev) => ({
      ...prev,
      board: initValue.issuesData.board,
    }));

    setInputValue(e.target.value);
  };

  const handleRepositoryFetch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue?.trim().length && inputValue !== repoUrl) {
      if (!inputValue.includes('https://github.com')) {
        setInputError(
          'Please make sure the url is a valid github repository URL'
        );

        return;
      }

      setIsFetching(true);
      setRepoUrl(inputValue);
    }
  };

  useUpdateEffect(() => {
    if (columnsData && !columnsData.error) {
      setKanbanData({ board: columnsData.data });
      setRepoName(columnsData.repoName);
    }

    if (
      columnsData &&
      columnsData.error &&
      typeof columnsData.error !== 'boolean'
    ) {
      setInputError(columnsData.error.message);
    }

    setIsFetching(false);
    cache.delete(repoUrl);
  }, [columnsData]);

  return (
    <ErrorBoundary>
      <form
        className="repo-fetch-input"
        onSubmit={(e) => handleRepositoryFetch(e)}
      >
        <div className="row">
          <label htmlFor="repositoryFetchInput" className="visually-hidden">
            Github Repository
          </label>
          <div className="col">
            <div>
              <input
                type="url"
                className="form-control"
                id="repositoryFetchInput"
                placeholder="Repository Url"
                onChange={(e) => handleInput(e)}
                required={true}
                autoComplete="url"
              />
              {inputError && (
                <div className="error text-danger">{inputError}</div>
              )}
            </div>
          </div>
          <div className="col-sm-auto">
            <button
              type="submit"
              className="btn btn-primary repo-fetch-input__btn"
            >
              Load Issues
            </button>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default memo(RepoFetchInput);
