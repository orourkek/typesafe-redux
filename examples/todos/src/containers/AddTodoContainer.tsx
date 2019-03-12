import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addTodo } from '../actions';
import AddTodo from '../components/AddTodo';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: (text: string) => dispatch(addTodo(text))
});

export default connect(undefined, mapDispatchToProps)(AddTodo);
