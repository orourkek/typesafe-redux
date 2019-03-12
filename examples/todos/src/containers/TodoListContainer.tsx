import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { completeAll, completeTodo, deleteTodo } from '../actions';
import TodoList from '../components/TodoList';
import { IAppState } from '../types';

const mapStateToProps = (state: IAppState) => ({ todos: state.todos });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  completeTodo: (id: string) => dispatch(completeTodo(id)),
  deleteTodo: (id: string) => dispatch(deleteTodo(id)),
  completeAll: () => dispatch(completeAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
