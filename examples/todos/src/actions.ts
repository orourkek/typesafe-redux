import { actionCreator } from 'typesafe-redux';
import { ITodo } from './types';

const pseudoRandomId = () => Math.random().toString(36).substr(2, 9);

/**
 * This action is written using the optional callback argument to illustrate
 * its usage, but it could also be written without it which would necessitate
 * passing the whole payload to the creator, including the id which is
 * currently generated inside the AC in the implementation below.
 */
export const addTodo = actionCreator('ADD_TODO', (type) => {
  return (text: string, completed: boolean = false) => ({
    type,
    payload: {
      id: pseudoRandomId(),
      text,
      completed
    }
  });
});

export const deleteTodo = actionCreator('DELETE_TODO')<ITodo['id']>();

export const editTodo = actionCreator('EDIT_TODO')<{
  id: ITodo['id'],
  newText: ITodo['text']
}>();

export const completeTodo = actionCreator('COMPLETE_TODO')<ITodo['id']>();

export const completeAll = actionCreator('COMPLETE_ALL')();

export const clearCompleted = actionCreator('CLEAR_COMPLETED')();
