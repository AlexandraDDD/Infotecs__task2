
import './App.scss';
import TaskList from './components/TaskList/TaskList';


import useList from './hooks/useList';

function App() {
  const { items, addItem, updateItem, toggleDone, removeItem } = useList();

  return (
    <div className="App">
      <div className="container">
        <h2>Список задач</h2>
        <button className="btn" onClick={addItem} >
            Создать задачу
          </button>
        <TaskList items={items} updateItem={updateItem} toggleDone={toggleDone} removeItem={removeItem}/>
      </div>
     

    </div>
  );
}

export default App;
