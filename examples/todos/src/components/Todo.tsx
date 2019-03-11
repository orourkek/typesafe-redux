import * as React from 'react';
import { ITodo } from '../types';

type Props = ITodo;

const Todo: React.FunctionComponent<Props> = (props) => {
  const style = {
    textDecoration: props.completed ? 'line-through' : undefined
  };
  return (
    <li style={ style }>
      <strong>{ props.text }</strong>
    </li>
  );
};

export default Todo;
