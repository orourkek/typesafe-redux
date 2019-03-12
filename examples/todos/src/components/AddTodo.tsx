import * as React from 'react';

enum Copy {
  InputPlaceholder = 'What needs doing?',
  AddTodo = 'Add Todo',
}

interface Props {
  addTodo: (text: string) => void;
}

const AddTodo: React.FunctionComponent<Props> = (props) => {

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
    <form className='addTodo' onSubmit={ onSubmit }>
      <input
        value={ text }
        onChange={ (e) => setText(e.target.value) }
        placeholder={ Copy.InputPlaceholder }
      />
      {!!text.length && (
        <button type='submit' className='submit'>{ Copy.AddTodo }</button>
      )}
    </form>
  );
};

export default AddTodo;
