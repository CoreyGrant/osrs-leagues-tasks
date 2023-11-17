import logo from './logo.svg';
import './App.css';
import './tasks.js';
import { Table } from './Table';
import { DataService } from './dataService';
import React from 'react';
const dataService = new DataService();
function App() {
  var [tab, setTab] = React.useState('all');
  var [allTasks, setAllTasks] = React.useState(window.tasks);
  const personalChange = (task) => {
    dataService.togglePersonalTask(task);
    var allTasksCopy = [...allTasks];
    var updatedTask = {...allTasksCopy.find(x => x.id === task.id)};
    updatedTask.personal = !updatedTask.personal;
    setAllTasks(allTasksCopy);
  }
  const completeChange = (task) => {
    dataService.toggleCompleteTask(task);
    var allTasksCopy = [...allTasks];
    var updatedTask = {...allTasksCopy.find(x => x.id === task.id)};
    updatedTask.complete = !updatedTask.complete;
    setAllTasks(allTasksCopy);
  }
  const personalTasks = allTasks.filter(x => !!x.personal);
  var element = <Table tasks={tab == 'all' ? allTasks : personalTasks} personalChange={personalChange} completeChange={completeChange}/>
  return (
    <div className="App">
      <button onClick={() => setTab(tab == 'all' ? 'personal' : 'all')} className="btn btn-primary">{tab == 'all' ? 'Personal' : 'All'}</button>
      {element}
    </div>
  );
}

export default App;
