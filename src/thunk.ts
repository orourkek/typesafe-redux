import { ThunkAction } from 'redux-thunk';
import { Action } from './index';

export type ThunkCreator<S, E, A extends Action<string>, R = void> = (
  ...args: any[]
) => ThunkAction<R, S, E, A>;

export function thunkCreator<
  State,
  ExtraArg,
  A extends Action<string>,
  C extends ThunkCreator<State, ExtraArg, A>
>(creator: C) {
  return creator;
}

// type ATest = (Action<'foo'> | Action<'bar'>);

// type MyThunkAction = ThunkAction<void, { stateFoo: string }, void, ATest>;
// type MyThunkCreator = ThunkCreator<{ stateFoo: string }, void, ATest>;

// const foo = thunkCreator((a: string, b?: string) => {
//   return (dispatch) => {
//     dispatch({ type: 'foo' });
//   };
// });

// const bar: MyThunkCreator = (a: string, b?: string) => {
//   return (dispatch) => {
//     dispatch({ type: 'foo' });
//     return 'bar';
//   };
// };

// const bbbbb = bar();

// const fooVal = foo();
