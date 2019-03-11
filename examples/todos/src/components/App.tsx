import * as React from 'react';
import { Provider } from 'react-redux';
import AddTodoContainer from '../containers/AddTodoContainer';
import TodoListContainer from '../containers/TodoListContainer';
import store from '../store';

const App = () => (
  <Provider store={ store }>
    <AddTodoContainer />
    <TodoListContainer />
  </Provider>
);

export default App;
