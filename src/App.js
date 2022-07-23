import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TaskListContainer from './components/display/TaskListContainer';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<TaskListContainer />} />
          <Route path="tasks">
            <Route path=":taskId" element={<TaskForm />} />
            <Route path="new" element={<TaskForm />} />
            <Route index element={<TaskForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
