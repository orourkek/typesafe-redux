import * as React from 'react';
import { ITodo } from '../types';

interface Props extends ITodo {
  complete: () => void;
  destroy: () => void;
}

const Todo: React.FunctionComponent<Props> = (props) => {
  const { completed, text, complete, destroy } = props;
  const className = `todo ${completed ? 'completed' : ''}`;
  return (
    <li className={ className }>
      <span className='checkbox' onClick={ complete } />
      <strong className='text'>{ text }</strong>
      <button className='destroy' onClick={ destroy }>×</button>
    </li>
  );
};

export default Todo;
