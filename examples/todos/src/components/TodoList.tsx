import * as React from 'react';
import { ITodo } from '../types';
import Todo from './Todo';

interface Props {
  todos: ITodo[];
}

const TodoList: React.FunctionComponent<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) =>
        <Todo key={ todo.id } { ...todo } />
      )}
    </ul>
  );
};

export default TodoList;
