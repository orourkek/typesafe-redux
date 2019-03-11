import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addTodo } from '../actions';

type Props = ReturnType<typeof mapDispatchToProps>;

const AddTodoContainer: React.FunctionComponent<Props> = (props) => {

  const [ text, setText ] = React.useState('');

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    props.addTodo(text);
    setText('');
  };

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <input value={ text } onChange={ (e) => setText(e.target.value) } />
        <button type='submit' disabled={ !text.length }>Add Todo</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: (text: string) => dispatch(addTodo(text))
});

export default connect(undefined, mapDispatchToProps)(AddTodoContainer);
