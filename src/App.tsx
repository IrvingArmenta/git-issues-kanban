import React from 'react';
import { RepoFetchInput, KanbanBoard } from './components';
// app styles
import './css/app.css';
import { AppContext, initValue } from './store';

function App() {
  return (
    <div className="app container">
      <AppContext.Provider value={initValue}>
        <RepoFetchInput />
        <KanbanBoard />
        <div>
          {/* <pre>{error ? JSON.stringify(error, null, 2) : 'null'}</pre>
          <pre>{data ? JSON.stringify(data, null, 2) : 'null'}</pre> */}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
