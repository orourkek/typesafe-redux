import * as React from 'react';
import { Provider } from 'react-redux';
import AddTodoContainer from './containers/AddTodoContainer';
import TodoListContainer from './containers/TodoListContainer';
import store from './store';

import './app.css';

const App = () => (
  <Provider store={ store }>
    <div className='appContainer'>
      <AddTodoContainer />
      <TodoListContainer />
    </div>
  </Provider>
);

export default App;
