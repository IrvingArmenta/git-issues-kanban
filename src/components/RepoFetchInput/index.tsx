import React, { FC, useState } from 'react';
import useSwr from 'swr';
import api from '../../api';
import { useUpdateEffect } from '../../hooks';
import { initValue, useStore } from '../../store';
import ErrorBoundary from '../ErrorBoundary';

// css
import './styles.css';

const RepoFetchInput: FC = () => {
  const { actions } = useStore();
  const [inputValue, setInputValue] = useState<string>();
  const [repoUrl, setRepoUrl] = useState<string>();
  const [inputError, setInputError] = useState<string>();
  const { data: columnsData, error } = useSwr(repoUrl ? repoUrl : null, api);

  const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setIsFetching(null);
    actions.setRepoName(null);
    actions.setKanbanData(initValue.issuesData.board);
    setInputError('');
    setRepoUrl(undefined);

    setInputValue(e.target.value);
  };

  const handleRepositoryFetch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputError('');
    actions.setIsFetching(true);

    if (
      inputValue?.trim().length &&
      inputValue?.includes('https://github.com')
    ) {
      setRepoUrl(inputValue);
    } else {
      setInputError('Make sure the URL is a valid repository URL from github');
    }
  };

  useUpdateEffect(() => {
    if (columnsData && !columnsData.error) {
      actions.setKanbanData(columnsData.data);
      actions.setRepoName(columnsData.repoName);
    }

    if (
      columnsData &&
      columnsData.error &&
      typeof columnsData.error !== 'boolean'
    ) {
      setInputError(columnsData.error.message);
    }

    actions.setIsFetching(false);
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
                onChange={(e) => handleInputEvent(e)}
                required={true}
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

export default RepoFetchInput;
