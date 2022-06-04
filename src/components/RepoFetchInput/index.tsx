import React, { FC, useState } from 'react';
import useSwr from 'swr';
import api from '../../api';
import ErrorBoundary from '../ErrorBoundary';

// css
import './styles.css';

const RepoFetchInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [repoUrl, setRepoUrl] = useState<string>();
  const { data, error } = useSwr(repoUrl, api);

  const handleRepositoryFetch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRepoUrl(inputValue);
  };

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
            <input
              type="url"
              className="form-control"
              id="repositoryFetchInput"
              placeholder="Repo Url"
              onChange={(e) => setInputValue(e.target.value)}
              required={true}
            />
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
