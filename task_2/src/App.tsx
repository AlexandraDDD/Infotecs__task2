
import './App.css';
import TaskList from './components/TaskList/TaskList';

import TaskForm from './components/TaskForm/TaskForm';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h2>Список задач</h2>
        <TaskForm />
        <TaskList />
      </div>
     

    </div>
  );
}

export default App;
