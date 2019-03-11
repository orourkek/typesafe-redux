import * as React from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { IAppState } from '../types';

const mapStateToProps = (state: IAppState) => ({ todos: state.todos });

export default connect(mapStateToProps)(TodoList);
