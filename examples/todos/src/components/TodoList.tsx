import * as React from 'react';
import { ITodo } from '../types';
import Todo from './Todo';

interface Props {
  todos: ITodo[];
  completeTodo: (id: string) => void;
  completeAll: () => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FunctionComponent<Props> = (props) => {
  const { todos, completeTodo, deleteTodo } = props;
  if (!todos.length) {
    return null;
  }
  return (
    <ul className='todoList'>
      {todos.map((todo) =>
        <Todo
          key={ todo.id }
          complete={ completeTodo.bind(completeTodo, todo.id) }
          destroy={ deleteTodo.bind(deleteTodo, todo.id) }
          { ...todo }
        />
      )}
      {!!props.todos.length && (
        <li>
          <button className='completeAll' onClick={ props.completeAll }>
            Complete All Todos
          </button>
        </li>
      )}
    </ul>
  );
};

export default TodoList;
