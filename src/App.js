import React from 'react';
import './App.css';
import TaskList from '../src/components/TaskList/TaskList';

function App() {
  return (
    <div className="App TasksListMain container">
      <header className="App-header">
          <TaskList />
      </header>
    </div>
  );
}

export default App;
