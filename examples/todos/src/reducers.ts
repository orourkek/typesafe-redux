import { Action, combineReducers } from 'redux';
import { isActionFrom } from 'typesafe-redux';
import * as actions from './actions';
import { IAppState } from './types';

export function todos(state: IAppState['todos'] = [], action: Action) {
  if (isActionFrom(action, actions.addTodo)) {
    return [ ...state, action.payload ];
  }
  if (isActionFrom(action, actions.deleteTodo)) {
    return state.filter((todo) => todo.id !== action.payload);
  }
  if (isActionFrom(action, actions.editTodo)) {
    const index = state.findIndex((todo) => todo.id === action.payload.id);
    if (index) {
      return [
        ...state.slice(0, index),
        { ...state[index], text: action.payload.newText },
        ...state.slice(index + 1)
      ];
    }
  }
  if (isActionFrom(action, actions.completeTodo)) {
    const index = state.findIndex((todo) => todo.id === action.payload);
    if (index) {
      return [
        ...state.slice(0, index),
        { ...state[index], completed: true },
        ...state.slice(index + 1)
      ];
    }
  }
  if (isActionFrom(action, actions.completeAll)) {
    return state.map((todo) => ({ ...todo, completed: true }));
  }
  if (isActionFrom(action, actions.clearCompleted)) {
    return state.filter((todo) => !todo.completed);
  }
  return state;
}

export const rootReducer = combineReducers({ todos });
